from flask import Flask
from views import views

app = Flask(__name__)

app = Flask(__name__, static_url_path='', static_folder='static')

app.register_blueprint(views, url_prefix="/")

if __name__ == '__main__':
    app.run(debug=True)