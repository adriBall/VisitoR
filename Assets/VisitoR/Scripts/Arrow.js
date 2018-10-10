#pragma strict

/*This class represents an arrow, with a source
visit point and a target visit point where this arrow 
allows to go*/
public class Arrow extends MonoBehaviour {
	public var sourceVisitPoint: VisitPoint;
	public var targetVisitPoint: VisitPoint;
	private var VisitoR: VisitoRController;
	private var waitForAccessCoroutine: Coroutine;
	private var origin = new Vector3(0,0);

	function Awake() {
		if(sourceVisitPoint != null)
			sourceVisitPoint.registerArrow(this);
	}

	function Start() {
		var VisitorObject = GameObject.Find("VisitoR");
		if(VisitorObject != null)
			VisitoR = VisitorObject.GetComponent(VisitoRController);
		else
			Debug.LogError("VisitoR not found. Make sure that there is a VisitoR object in the scene named 'VisitoR'");

		if(sourceVisitPoint == null || targetVisitPoint == null) {
			Debug.LogWarning("Arrow '"+gameObject.name+" 'has no target or source visit point, hiding...");
			gameObject.SetActive(false);
		}
	}

	function OnCollisionEnter(target: UnityEngine.Collision) {
		if(target.gameObject.tag != "Pointer") return;
		VisitoR.startProgressBar();
		waitForAccessCoroutine = StartCoroutine(startWaitingForAccess());
	}

	function OnCollisionExit(target: UnityEngine.Collision) {
		if(target.gameObject.tag != "Pointer") return;
		StopCoroutine(waitForAccessCoroutine);
		VisitoR.cancelProgressBar();
	}

	function startWaitingForAccess() {
		yield WaitForSeconds(VisitoR.accessWaitSeconds);
		if(targetVisitPoint != null)
			VisitoR.fadedMoveTo(targetVisitPoint);
		else
			Debug.LogWarning("Arrow with no visit point");
	}

}
