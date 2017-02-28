from hashlib import md5
import urllib.parse
import requests
import random
try:
    from ._private import BAIDU
except:
    print("_private.py not exist ; please copy _private.py.example to _private.py , then edit this file add baidu transalte key")

    class BAIDU:

        class TRANS:
            ID = "20151113000005349"
            KEY = "osubCEzlGjzvw8qdQc41"


def translate(txt, to_lang="zh", from_lang="en"):
    myurl = '/api/trans/vip/translate'
    salt = random.randint(0, 65536)

    sign = BAIDU.TRANS.ID + txt + str(salt) + BAIDU.TRANS.KEY
    m1 = md5(sign.encode('utf-8'))
    sign = m1.hexdigest()
    myurl = myurl + '?appid=' + BAIDU.TRANS.ID + '&q=' + urllib.parse.quote(
        txt) + '&from=' + from_lang + '&to=' + to_lang + '&salt=' + str(salt) + '&sign=' + sign

    r = requests.get("http://api.fanyi.baidu.com%s" % myurl)
    li = []
    for i in r.json()['trans_result']:
        li.append((i['src'].strip(), i['dst']))
    return li

if __name__ == "__main__":
    print(translate("""I'm a good boy. My country is china .\nwho are you"""))
