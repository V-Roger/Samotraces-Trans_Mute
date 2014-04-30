<!doctype html>

<html>
<head>

<meta charset="utf-8">
<title>Samotraces - Example 1 - Collect and visualise traces with a KTBS</title>

<link rel="stylesheet" type="text/css" href="css/samotraces.css"> 

<script type="text/javascript" src="javascript/d3.v3.min.js"></script>
<script type="text/javascript" src="javascript/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="javascript/main.js"></script>

<!-- Samotraces - production -->
<script type="text/javascript" src="../../src/javascript_all.php"></script>

<!-- Samotraces - debug - ->
<script type="text/javascript" src="../../src/Tools/xml2json.js"></script>
<!-- Collecte - ->
<script type="text/javascript" src="../../src/Collecte/Collecteur.js"></script>
<!-- Objects - ->
<script type="text/javascript" src="../../src/Objects/ObserverObservable.js"></script>
<script type="text/javascript" src="../../src/Objects/EventBuilder.js"></script>
<script type="text/javascript" src="../../src/Objects/CurrentObsel.js"></script>
<script type="text/javascript" src="../../src/Objects/Timer.js"></script>
<script type="text/javascript" src="../../src/Objects/SelfUpdatingTimer.js"></script>
<script type="text/javascript" src="../../src/Objects/TimeWindow.js"></script>
<script type="text/javascript" src="../../src/Objects/TimeWindowCenteredOnTime.js"></script>
<script type="text/javascript" src="../../src/Objects/Obsel.js"></script>
<script type="text/javascript" src="../../src/Objects/DemoTrace.js"></script>
<script type="text/javascript" src="../../src/Objects/KtbsTrace.js"></script>
<script type="text/javascript" src="../../src/Objects/KtbsBogueTrace.js"></script>
<script type="text/javascript" src="../../src/Objects/WindowState.js"></script>
<!-- Widgets - ->
<script type="text/javascript" src="../../src/Widgets/Widget.js"></script>
<!-- Widgets / Basic - ->
<script type="text/javascript" src="../../src/Widgets/Basic/ObselInspector.js"></script>
<script type="text/javascript" src="../../src/Widgets/Basic/TimeForm.js"></script>
<script type="text/javascript" src="../../src/Widgets/Basic/TimeSlider.js"></script>
<script type="text/javascript" src="../../src/Widgets/Basic/WindowSlider.js"></script>
<!-- Widgets / d3Basic - ->
<script type="text/javascript" src="../../src/Widgets/d3Basic/TraceDisplayIcons.js"></script>
<script type="text/javascript" src="../../src/Widgets/d3Basic/WindowScale.js"></script>
<!-- -->

</head>
<body>


<div>
	<form id="url_form" action="">
	<p>Url of the ktbs trace to display: <input id="url" type="text" name="url" size="60" value="<?php if(isset($_GET['url'])) { echo($_GET['url']); } else { echo('http://127.0.0.1/ktbs/base-OFS-TestProto1/trace-test1/'); } ?>"/>
	<input type="submit" value="Load trace"/></p>
	</form>
</div>


<div id="time_form"></div>
<div id="trace"></div>
<div id="slider"></div>
<div id="scale"></div>
<div id="trace2"></div>
<div id="slider2"></div>
<div id="scale2"></div>
<div id="obselinspector"></div>

<div>
	<form id="iframe_url_form" action="">
	<input id="iframe_url" type="text" name="url" size="60" value="empty_form.html"/>
	<input type="submit" value="Go!"/>
	</form>
</div>

<!--
-->

<iframe src="" id="iframe" width="400px" height="250px"/>



</body>
</html>
