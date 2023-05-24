from flask import Blueprint, jsonify, request
from pyattck import Attck


mitre = Blueprint("mitre", __name__, url_prefix="/mitre")
attack = Attck(
    nested_techniques=True,
    use_config=False,
    save_config=False,
    config_file_path='~/pyattck/config.yml',
    data_path='~/pyattck/data',
    enterprise_attck_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/merged_enterprise_attck_v1.json",
    pre_attck_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/merged_pre_attck_v1.json",
    mobile_attck_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/merged_mobile_attck_v1.json",
    ics_attck_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/merged_ics_attck_v1.json",
    nist_controls_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/merged_nist_controls_v1.json",
    generated_nist_json="https://swimlane-pyattck.s3.us-west-2.amazonaws.com/attck_to_nist_controls.json"
)

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
    data = {'attackID': techniques[0].id, 'attackName' : techniques[0].name}
    Result = { 'code' : 200, 'data' : data }
    return jsonify(Result)

  except Exception as e:
    print(e)
    Result = { 'code' : 500}
    return jsonify(Result)
