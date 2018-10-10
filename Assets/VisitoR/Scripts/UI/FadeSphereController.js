#pragma strict

@script RequireComponent(MeshFilter)
class FadeSphereController extends MonoBehaviour {

	function Start () {
		flipNormals();
		flipTriangles();
	}

	function fadeAction(action: function(): void, fadeSeconds: float) {
		var startTime = Time.time;
		var endTime = startTime + fadeSeconds/2;
		while(Time.time < endTime) {
			setAlpha(Mathf.InverseLerp(startTime, endTime, Time.time));
			yield;
		}
		setAlpha(1.0);
		action();
		startTime = endTime;
		endTime += fadeSeconds/2;
		while(Time.time < endTime) {
			setAlpha(Mathf.InverseLerp(endTime, startTime, Time.time));
			yield;
		}
		setAlpha(0.0);
	}

	private function flipNormals() {
		var normals = gameObject.GetComponent(MeshFilter).mesh.normals;
		for(var i = 0; i < normals.length; i++)
			normals[i] = -normals[i];
		gameObject.GetComponent(MeshFilter).mesh.normals = normals;
	}

	private function flipTriangles() {
		var triangles = gameObject.GetComponent(MeshFilter).mesh.triangles;
		for(var j = 0; j < triangles.length; j+=3) {
			var t = triangles[j];
			triangles[j] = triangles[j+2];
			triangles[j+2] = t;
		}
		gameObject.GetComponent(MeshFilter).mesh.triangles = triangles;
	}

	private function setAlpha(alpha: float) {
		var color: Color = gameObject.GetComponent(Renderer).material.color;
		color.a = alpha;
		gameObject.GetComponent(Renderer).material.color = color;
	}

}
