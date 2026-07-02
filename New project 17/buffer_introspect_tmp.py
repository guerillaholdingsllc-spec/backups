import json

from buffer_agent import gql

queries = {
    "delete_success": '{ __type(name: "DeletePostSuccess") { kind name fields { name type { kind name ofType { kind name } } } } }',
}
for name, query in queries.items():
    try:
        print("---", name)
        print(json.dumps(gql(query), indent=2)[:6000])
    except Exception as e:
        print("---", name, "ERR", str(e)[:1000])
