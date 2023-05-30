from flask import Blueprint, jsonify, request
from pyattck import Attck


mitre = Blueprint("mitre", __name__, url_prefix="/mitre")
attack = Attck()

@mitre.route("/test",methods=['GET'])
def get_mitreTest():
  print('== MITRE ATT&CK Test')
  try:
    data = {'attackTool':'Nmap'}
    Result = { 'code' : 200, 'data' : data }
    return jsonify(Result)

  except Exception as e:
    print(e)
    Result = { 'code' : 500}
    return jsonify(Result)
  

@mitre.route("/techniques", methods=['GET'])
def get_techniques():
  print('== MITRE ATT&CK ==')
  try:
    techniques = attack.enterprise.techniques
    data = {'attackID': techniques.id, 'attackName' : techniques.name}
    Result = { 'code' : 200, 'data' : data }
    return jsonify(Result)

  except Exception as e:
    print(e)
    Result = { 'code' : 500}
    return jsonify(Result)


@mitre.route("/getIdByName", methods=['POST'])
def get_technique_id():
    try:
        data = request.get_json()
        technique_name = data.get('techniqueName')

        techniques = attack.enterprise.techniques
        for technique in techniques:
            if technique.name == technique_name:
                result = {
                    'code': 200,
                    'techniqueID': technique.id,
                    'techniqueName': technique.name
                }
                return jsonify(result)

        # If the technique name is not found
        result = {'code': 404, 'message': 'Technique not found'}
        return jsonify(result)

    except Exception as e:
        print(e)
        result = {'code': 500, 'message': 'Internal server error'}
        return jsonify(result)
