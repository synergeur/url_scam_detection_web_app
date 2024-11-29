from flask import Flask
from flask_lambda import FlaskLambda
from netlify.functions.views import views

app = FlaskLambda(__name__)

app = FlaskLambda(__name__, static_url_path='', static_folder='../static')

app.register_blueprint(views, url_prefix="/")

if __name__ == '__main__':
    app.run(debug=True)