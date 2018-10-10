#pragma strict

/*This class allows to move the visitor to visit points within the scene
dealing with transition effects such as fade in/out*/
public class VisitoRController extends MonoBehaviour {
	public var currentVisitPoint: VisitPoint;
	public var accessWaitSeconds: float = 2;
	public var fadeSeconds: float = 1;
	private var progressBarController: ProgressBarController;
	private var fadeController: FadeSphereController;
	private var moving = false;

	function Start() {
		if(currentVisitPoint != null) 
			initialMoveTo(currentVisitPoint);
		else
			logError("A currentVisitPoint as initial visit point is needed");
		loadControllers();
	}

	function moveTo(vp: VisitPoint) {
		currentVisitPoint.hideNearbyArrows();
		transform.position = vp.transform.position;
		vp.showNearbyArrows();
		currentVisitPoint = vp;
		moving = false;
	}

	function fadedMoveTo(vp: VisitPoint) {
		if(moving) return;
		moving = true;
		fadeController.fadeAction(function() {
			moveTo(vp);
		}, fadeSeconds);
	}

	function startProgressBar() {
		if(moving) return;
		progressBarController.makeProgress(accessWaitSeconds);
	}

	function cancelProgressBar() {
		progressBarController.cancelProgress();
	}

	private function initialMoveTo(vp: VisitPoint) {
		while(!currentVisitPoint.isReady()) 
			yield;	
		moveTo(currentVisitPoint);
	}

	private function loadControllers(): String {
		var canvas = gameObject.GetComponentInChildren(Canvas);
		if(canvas == null) return logError("Canvas not found");
		progressBarController = canvas.GetComponentInChildren(ProgressBarController);
		if(progressBarController == null) return logError("Progress bar controller not found");
		fadeController = gameObject.GetComponentInChildren(FadeSphereController);
		if(fadeController == null) return logError("Fade controller not found");
	}

	private function logError(message: String): String {
		Debug.LogError(message);
		return message;
	}

}
