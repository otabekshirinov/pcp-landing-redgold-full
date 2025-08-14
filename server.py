from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
import csv, os, datetime
try:
    from dotenv import load_dotenv; load_dotenv()
except Exception: pass

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

INBOX = "inbox.csv"
ADMIN_PATH = os.getenv("ADMIN_PATH", "/sms")         # e.g. "/sms" or "/message"
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")           # optional token; if set, require ?t=TOKEN

def write_row(data):
    row = [datetime.datetime.now().isoformat(timespec="seconds"),
           data.get("name",""), data.get("phone",""), data.get("msg",""), data.get("lang","")]
    new_file = not os.path.exists(INBOX)
    with open(INBOX, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new_file:
            w.writerow(["timestamp","name","phone","message","lang"])
        w.writerow(row)

@app.post("/api/contact")
def api_contact():
    data = request.get_json(force=True, silent=True) or {}
    write_row(data)
    return jsonify({"ok": True})

@app.get("/")
def root():
    return app.send_static_file("index.html")

# Admin view (path from env)
def guard_token():
    if ADMIN_TOKEN and request.args.get("t") != ADMIN_TOKEN:
        return Response("Forbidden", status=403)

def render_table():
    rows = []
    if os.path.exists(INBOX):
        with open(INBOX, "r", encoding="utf-8") as f:
            r = csv.DictReader(f)
            rows = list(r)
        rows.sort(key=lambda x: x.get("timestamp",""), reverse=True)
    # Build simple HTML table
    head = """<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>PCP — Заявки</title>
    <style>
      body{font-family:Inter,Segoe UI,Arial,sans-serif;background:#12080a;color:#fff5f7;margin:0;padding:24px}
      h1{margin:0 0 10px;font-family:Playfair Display,Georgia,serif}
      .hint{color:#f3cdd3;margin:0 0 12px}
      .bar{display:flex;gap:10px;align-items:center;margin:12px 0 18px}
      input[type=search]{padding:10px 12px;border-radius:10px;border:1px solid #3a1014;background:#1b0e11;color:#fff5f7;min-width:260px}
      a.btn{padding:10px 14px;border-radius:10px;border:1px solid #3a1014;background:linear-gradient(135deg,#F6D56B,#B97A13);color:#2b0c10;text-decoration:none;font-weight:700}
      table{width:100%;border-collapse:collapse;background:rgba(255,255,255,.03);border:1px solid #3a1014;border-radius:14px;overflow:hidden}
      th,td{padding:12px 14px;border-bottom:1px dashed rgba(255,255,255,.09);vertical-align:top}
      th{background:#1b0e11;text-align:left}
      tr:hover{background:rgba(255,255,255,.04)}
      .muted{color:#f3cdd3}
      .nowrap{white-space:nowrap}
      .msg{white-space:pre-wrap}
    </style></head><body>"""
    bar = f"<h1>Заявки</h1><p class='hint'>Путь: <code>{ADMIN_PATH}</code>. Экспорт CSV — по кнопке.</p><div class='bar'><input id='q' type='search' placeholder='Поиск по имени/телефону/сообщению'><a class='btn' href='{ADMIN_PATH}/export{('?t='+ADMIN_TOKEN) if ADMIN_TOKEN else ''}'>Скачать CSV</a></div>"
    table_head = "<table><thead><tr><th>Дата/время</th><th>Имя</th><th>Телефон</th><th>Язык</th><th>Сообщение</th></tr></thead><tbody>"
    body_rows = ""
    for r in rows:
        body_rows += f"<tr><td class='nowrap'>{r.get('timestamp','')}</td><td>{r.get('name','')}</td><td class='nowrap'>{r.get('phone','')}</td><td class='muted'>{r.get('lang','')}</td><td class='msg'>{r.get('message','')}</td></tr>"
    if not rows:
        body_rows = "<tr><td colspan='5' class='muted'>Пока нет заявок</td></tr>"
    table_tail = "</tbody></table>"
    script = """<script>
      const q=document.getElementById('q'); q?.addEventListener('input',()=>{
        const v=q.value.toLowerCase();
        document.querySelectorAll('tbody tr').forEach(tr=>{
          const t=tr.innerText.toLowerCase();
          tr.style.display = t.includes(v)?'':'none';
        });
      });
    </script>"""
    return head + bar + table_head + body_rows + table_tail + script + "</body></html>"

def admin_view():
    g = guard_token()
    if g: return g
    return render_table()

def export_csv():
    g = guard_token()
    if g: return g
    if not os.path.exists(INBOX):
        return Response("No data", status=404)
    return send_file(INBOX, as_attachment=True, download_name="inbox.csv")

# Register routes with dynamic ADMIN_PATH
app.add_url_rule(ADMIN_PATH, "admin_view", admin_view, methods=["GET"])
app.add_url_rule(f"{ADMIN_PATH}/export", "export_csv", export_csv, methods=["GET"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
