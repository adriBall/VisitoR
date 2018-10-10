#pragma strict
#pragma downcast

/*This class represents a visit point, which has attached 
access points to allow moving between visit points*/
public class VisitPoint extends MonoBehaviour {
	private var nearbyArrows = new Array();
	private var ready = false;

	function Start() {
		hideNearbyArrows();
		ready = true;
	}

	function isReady(): boolean {
		return ready;
	}

	function registerArrow(a: Arrow) {
		if(a != null) 
			nearbyArrows.Add(a);
	}

	function showNearbyArrows() {
		if(nearbyArrows == null || nearbyArrows.length == 0)
			Debug.LogWarning("No arrow attached to the visit point '"+gameObject.name+"'");
		else
			for(var a: Arrow in nearbyArrows)
				if(a != null)
					a.gameObject.SetActive(true);
	}

	function hideNearbyArrows() {
		if(nearbyArrows != null)
			for(var a: Arrow in nearbyArrows)
				if(a != null)
					a.gameObject.SetActive(false);
	}

}
