# VisitoR #

## Description
This is a Unity package for building a simple navigation system over a 3D scene. It consists of a first person view where 'pointing' to an indicator allows to move from the current scene place to another one.

<p align="center">
  <img src="VisitoRexample.gif">
</p>

## Status
VisitoR currently works with a mouse or with Android touch devices. It will require modifications in order to work with other input systems, such as VR. 

## Usage
In this repository there is a release ready to be imported from your project. Also, this project contains an example scene into `Assets/VisitoR/Example` (not contained in the released package).

The main steps for using this package are:
- Place the `VisitoR` object from the prefab anywhere in the scene. It's important not to change its object name. It already contains a camera.
- Place the `VisitPoint` objects from the prefab in the scene places that can be visited. One of them must be dragged into the `VisitoRController` script of the `VisitoR` object in order to be the initial point.
- In order to allow the `VisitoR` move between two points, you must place in the scene an `Arrow` object from the prefab and drag to its script a source and a target visit points. An Arrow will only be visible when the `VisitoR` is in its origin visit point.

The `VisitoR` object contains a first person controller which can be configured, modified or even replaced in order to satisfy other platform requirements. In its `VisitoRController` script you can configure some transition parameters. The `Arrow`, `VisitoR.Canvas.Pointer` and `VisitoR.Canvas.ProgressBar` images can be replaced.

This project depends of the standard assets `Characters` and `CrossPlatformInput`, which are included in the released package.
