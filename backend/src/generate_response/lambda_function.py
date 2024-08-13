import json
from urllib.parse import unquote

from agents.graph import build_graph
from config import DEBUG_MODE

def lambda_handler(event, context):
    print("Event: ", event)
    print("Context: ", context)

    path_parameter = event["pathParameters"]
    print("event: ", path_parameter)

    query = unquote(path_parameter["query"])
    print("human_input: ", query)
    # Get the environment variables
    # bucket_name = os.environ['BUCKET_NAME']
    # key = os.environ['KEY']
    print(DEBUG_MODE)


    


    if DEBUG_MODE:
        body = "### Dezinform\u00e1torsk\u00e9 \u017en\u011b kv\u016fli ukrajinsk\u00e9mu obil\u00ed: EU p\u0159itom nezav\u00e1d\u00ed omezen\u00ed dovozu kv\u016fli jed\u016fm\n\n#### I. \u00davod\nC\u00edlem tohoto \u010dl\u00e1nku je prozkoumat dezinformace obklopuj\u00edc\u00ed dovoz ukrajinsk\u00e9ho obil\u00ed a postoj Evropsk\u00e9 unie (EU) k mo\u017en\u00fdm omezen\u00edm kv\u016fli obav\u00e1m z pesticid\u016f. Vzhledem k aktu\u00e1ln\u00ed situaci ohledn\u011b v\u00fdvozu obil\u00ed z Ukrajiny a geopolitick\u00fdm d\u016fsledk\u016fm prob\u00edhaj\u00edc\u00edho konfliktu je d\u016fle\u017eit\u00e9 objasnit, jak\u00e9 informace jsou pravdiv\u00e9 a jak\u00e9 jsou zav\u00e1d\u011bj\u00edc\u00ed.\n\n#### II. Pozad\u00ed ukrajinsk\u00e9ho v\u00fdvozu obil\u00ed\nUkrajina je v\u00fdznamn\u00fdm producentem a v\u00fdvozcem obil\u00ed, co\u017e m\u00e1 kl\u00ed\u010dov\u00fd v\u00fdznam pro glob\u00e1ln\u00ed potravinovou bezpe\u010dnost. V d\u016fsledku v\u00e1lky do\u0161lo k naru\u0161en\u00ed tradi\u010dn\u00edch exportn\u00edch tras, co\u017e vedlo k nutnosti p\u0159epravovat zem\u011bd\u011blsk\u00e9 produkty po sou\u0161i p\u0159es sousedn\u00ed zem\u011b. EU se sna\u017e\u00ed usnadnit v\u00fdvoz ukrajinsk\u00e9ho obil\u00ed, aby zm\u00edrnila glob\u00e1ln\u00ed potravinov\u00e9 nedostatky.\n\n#### III. Krajina dezinformac\u00ed\nDezinformace se obvykle definuje jako z\u00e1m\u011brn\u00e9 \u0161\u00ed\u0159en\u00ed nepravdiv\u00fdch nebo zav\u00e1d\u011bj\u00edc\u00edch informac\u00ed. V p\u0159\u00edpad\u011b ukrajinsk\u00e9ho obil\u00ed se objevuj\u00ed m\u00fdty o jeho kontaminaci a toxicit\u011b, stejn\u011b jako tvrzen\u00ed o omezen\u00edch dovozu ze strany EU kv\u016fli zdravotn\u00edm obav\u00e1m. Kl\u00ed\u010dov\u00fdmi akt\u00e9ry \u0161\u00ed\u0159\u00edc\u00edmi tyto dezinformace jsou soci\u00e1ln\u00ed m\u00e9dia a n\u011bkte\u0159\u00ed politick\u00ed p\u0159edstavitel\u00e9.\n\n#### IV. Regula\u010dn\u00ed r\u00e1mec EU v oblasti bezpe\u010dnosti potravin\nEU m\u00e1 p\u0159\u00edsn\u00e9 standardy bezpe\u010dnosti potravin a monitorovac\u00ed syst\u00e9my, kter\u00e9 zaji\u0161\u0165uj\u00ed, \u017ee dov\u00e1\u017een\u00e9 zbo\u017e\u00ed spl\u0148uje stanoven\u00e9 normy. Pesticidov\u00e9 regulace EU se vztahuj\u00ed i na dov\u00e1\u017een\u00e9 produkty, p\u0159i\u010dem\u017e aktu\u00e1ln\u011b neexistuj\u00ed \u017e\u00e1dn\u00e1 aktivn\u00ed omezen\u00ed na dovoz ukrajinsk\u00e9ho obil\u00ed z d\u016fvodu obav z pesticid\u016f.\n\n#### V. P\u0159\u00edpadov\u00e9 studie dezinformac\u00ed\nJedn\u00edm z p\u0159\u00edklad\u016f dezinforma\u010dn\u00ed kampan\u011b je tvrzen\u00ed, \u017ee ukrajinsk\u00e9 obil\u00ed obsahuje zak\u00e1zan\u00e9 pesticidy, co\u017e vyvolalo ve\u0159ejn\u00e9 obavy a protesty. Politick\u00e9 reakce na tuto dezinformaci vedly k tlaku na EU, aby zavedla restrikce, co\u017e v\u0161ak nen\u00ed v souladu s jej\u00edmi pravidly a z\u00e1vazky v\u016f\u010di voln\u00e9mu trhu.\n\n#### VI. D\u016fsledky dezinformac\u00ed\nDezinformace mohou m\u00edt v\u00e1\u017en\u00e9 d\u016fsledky pro ve\u0159ejn\u00e9 zdrav\u00ed, ekonomiku a politiku. Mistrust v bezpe\u010dnost potravin m\u016f\u017ee v\u00e9st k panice mezi spot\u0159ebiteli, zat\u00edmco negativn\u00ed dopady na zem\u011bd\u011blsk\u00fd trh mohou ohrozit obchodn\u00ed vztahy a stabilitu trhu.\n\n#### VII. Boj proti dezinformac\u00edm\nOrganizace zab\u00fdvaj\u00edc\u00ed se ov\u011b\u0159ov\u00e1n\u00edm fakt\u016f hraj\u00ed kl\u00ed\u010dovou roli v ov\u011b\u0159ov\u00e1n\u00ed informac\u00ed t\u00fdkaj\u00edc\u00edch se bezpe\u010dnosti potravin a zem\u011bd\u011blsk\u00fdch dovoz\u016f. Je d\u016fle\u017eit\u00e9 vzd\u011bl\u00e1vat ve\u0159ejnost o rozli\u0161ov\u00e1n\u00ed mezi d\u016fv\u011bryhodn\u00fdmi informacemi a dezinformacemi. Doporu\u010den\u00ed pro zlep\u0161en\u00ed transparentnosti a komunikace ze strany EU zahrnuj\u00ed pravidelnou aktualizaci informac\u00ed o bezpe\u010dnosti potravin.\n\n#### VIII. Z\u00e1v\u011br\nTento \u010dl\u00e1nek shrnuje kl\u00ed\u010dov\u00e9 body t\u00fdkaj\u00edc\u00ed se dezinformac\u00ed obklopuj\u00edc\u00edch ukrajinsk\u00e9 obil\u00ed a postoj EU. Je d\u016fle\u017eit\u00e9, aby \u010dten\u00e1\u0159i vyhled\u00e1vali spolehliv\u00e9 zdroje a kriticky se zapojovali do informac\u00ed, kter\u00e9 konzumuj\u00ed."
        from load_secrets import load_secrets
        print("Loading secrets")
        load_secrets()
        print("Secrets loaded")

        from clients import get_model, get_tavily
        print("Getting model")
        model = get_model()
        print("Model gotten")
        print("Getting tavily")
        tavily = get_tavily()
        print("Tavily gotten")
        
        return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        'body': json.dumps(f"""# DEBUG MODE ENABLED \
                           {query}
                           """)
        }
    print("Build graph")
    graph = build_graph()
    print("Build graph finished")

    # query = "Dezinformátorské žně kvůli ukrajinskému obilí. EU přitom nezavádí omezení dovozu kvůli jedům"
    params = {
        'task': query,
        'target_language': "czech",
    }
    config = {"configurable": {"thread_id": 1}}
    print("Invoke graph")
    final_state = graph.invoke(params, config=config, debug=DEBUG_MODE)
    print("Finished")
    content = final_state['draft']
    print(json.dumps(content))
    # Return the response
    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        'body': json.dumps(content)
    }