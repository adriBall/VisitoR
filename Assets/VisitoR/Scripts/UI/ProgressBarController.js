#pragma strict

@script RequireComponent(UnityEngine.UI.Image)
class ProgressBarController extends MonoBehaviour {
	private var progressBarImage: UnityEngine.UI.Image;
	private var progressBarCoroutine: Coroutine;

	function Start() {
		progressBarImage = gameObject.GetComponent(UnityEngine.UI.Image);
	}

	function makeProgress(progressSeconds: float) {
		progressBarCoroutine = StartCoroutine(makeProgressCoroutine(progressSeconds));
	}

	function makeProgressCoroutine(progressSeconds: float) {
		var startTime = Time.time;
		var endTime = startTime + progressSeconds;
		while(Time.time <= endTime) {
			yield;
			progressBarImage.fillAmount = Mathf.InverseLerp(startTime, endTime, Time.time);
		}
		progressBarImage.fillAmount = 0;
	}

	function cancelProgress() {
		StopCoroutine(progressBarCoroutine);
		progressBarImage.fillAmount = 0;
	}

}
