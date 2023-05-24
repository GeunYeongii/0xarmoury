from pyattck import Attck

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

for i in range(5) :
    print("ID : ",attack.enterprise.techniques[i].id)
    print("NAME : ",attack.enterprise.techniques[i].name)
    # for subtechnique in technique.techniques:
    #     print(subtechnique.id)
    #     print(subtechnique.name)