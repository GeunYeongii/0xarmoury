from flask_cors import CORS
from flask import Flask
import os
from .controller.mitreController import mitre

app = Flask(__name__)
CORS(app)


app.register_blueprint(mitre)
