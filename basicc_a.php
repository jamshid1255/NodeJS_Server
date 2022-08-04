<?php
session_start();
?>
<script src="../src/sigma.core.js"></script>
<script src="../src/conrad.js"></script>
<script src="../src/utils/sigma.utils.js"></script>
<script src="../src/utils/sigma.polyfills.js"></script>
<script src="../src/sigma.settings.js"></script>
<script src="../src/classes/sigma.classes.dispatcher.js"></script>
<script src="../src/classes/sigma.classes.configurable.js"></script>
<script src="../src/classes/sigma.classes.graph.js"></script>
<script src="../src/classes/sigma.classes.camera.js"></script>
<script src="../src/classes/sigma.classes.quad.js"></script>
<script src="../src/classes/sigma.classes.edgequad.js"></script>
<script src="../src/captors/sigma.captors.mouse.js"></script>
<script src="../src/captors/sigma.captors.touch.js"></script>
<script src="../src/renderers/sigma.renderers.canvas.js"></script>
<script src="../src/renderers/sigma.renderers.webgl.js"></script>
<script src="../src/renderers/sigma.renderers.svg.js"></script>
<script src="../src/renderers/sigma.renderers.def.js"></script>
<script src="../src/renderers/webgl/sigma.webgl.nodes.def.js"></script>
<script src="../src/renderers/webgl/sigma.webgl.nodes.fast.js"></script>
<script src="../src/renderers/webgl/sigma.webgl.edges.def.js"></script>
<script src="../src/renderers/webgl/sigma.webgl.edges.fast.js"></script>
<script src="../src/renderers/webgl/sigma.webgl.edges.arrow.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.labels.def.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.hovers.def.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.nodes.def.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edges.def.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edges.curve.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edges.arrow.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edges.curvedArrow.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edgehovers.def.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edgehovers.curve.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edgehovers.arrow.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.edgehovers.curvedArrow.js"></script>
<script src="../src/renderers/canvas/sigma.canvas.extremities.def.js"></script>
<script src="../src/renderers/svg/sigma.svg.utils.js"></script>
<script src="../src/renderers/svg/sigma.svg.nodes.def.js"></script>
<script src="../src/renderers/svg/sigma.svg.edges.def.js"></script>
<script src="../src/renderers/svg/sigma.svg.edges.curve.js"></script>
<script src="../src/renderers/svg/sigma.svg.labels.def.js"></script>
<script src="../src/renderers/svg/sigma.svg.hovers.def.js"></script>
<script src="../src/middlewares/sigma.middlewares.rescale.js"></script>
<script src="../src/middlewares/sigma.middlewares.copy.js"></script>
<script src="../src/misc/sigma.misc.animation.js"></script>
<script src="../src/misc/sigma.misc.bindEvents.js"></script>
<script src="../src/misc/sigma.misc.bindDOMEvents.js"></script>
<script src="../src/misc/sigma.misc.drawHovers.js"></script>
<script src="jquery.min.js"></script>
<!-- END SIGMA IMPORTS -->
<script src="../plugins/sigma.parsers.gexf/gexf-parser.js"></script>
<script src="../plugins/sigma.parsers.gexf/sigma.parsers.gexf.js"></script>
<script src="../plugins/sigma.plugins.filter/sigma.plugins.filter.js"></script>
<link href='http://fonts.googleapis.com/css?family=Lato:300,700' rel='stylesheet' type='text/css'>
<div id="container">
  <style>
    body {
      color: #333;
      font-size: 14px;
      font-family: Lato, sans-serif;
    }
    #graph-container {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
    }
    #control-pane {
      top: 10px;
      /*bottom: 10px;*/
      right: 10px;
      position: absolute;
      width: 230px;
      background-color: rgb(249, 247, 237);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    #control-pane > div {
      margin: 10px;
      overflow-x: auto;
    }
    .line {
      clear: both;
      display: block;
      width: 100%;
      margin: 0;
      padding: 12px 0 0 0;
      border-bottom: 1px solid #aac789;
      background: transparent;
    }
    h2, h3, h4 {
      padding: 0;
      font-variant: small-caps;
    }
    .green {
      color: #437356;
    }
    h2.underline {
      color: #437356;
      background: #f4f0e4;
      margin: 0;
      border-radius: 2px;
      padding: 8px 12px;
      font-weight: 700;
    }
    .hidden {
      display: none;
      visibility: hidden;
    }

    input[type=range] {
      width: 160px;
    }
	.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.button2 {background-color: #008CBA;} /* Blue */
.button3 {background-color: #f44336;} /* Red */ 
.button4 {background-color: #e7e7e7; color: black;} /* Gray */ 
.button5 {background-color: #555555;} /* Black */
div { margin: 20px; }

/* -------------------- Select Box Styles: bavotasan.com Method (with special adaptations by ericrasch.com) */
/* -------------------- Source: http://bavotasan.com/2011/style-select-box-using-only-css/ */
.styled-select {
   background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
   height: 29px;
   overflow: hidden;
   width: 180px;
}

.styled-select select {
   background: #555555;
   border: none;
   font-size: 14px;
   height: 29px;
   padding: 5px; /* If you add too much padding here, the options won't show in IE */
   width: 180px;
}

.styled-select.slate {
   background: url(http://i62.tinypic.com/2e3ybe1.jpg) no-repeat right center;
   height: 34px;
   width: 240px;
}

.styled-select.slate select {
   border: 1px solid #ccc;
   font-size: 16px;
   height: 34px;
   width: 268px;
}

/* -------------------- Rounded Corners */
.rounded {
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
}

.semi-square {
   -webkit-border-radius: 5px;
   -moz-border-radius: 5px;
   border-radius: 5px;
}

/* -------------------- Colors: Background */
.slate   { background-color: #ddd; }
.green   { background-color: #779126; }
.blue    { background-color: #3b8ec2; }
.yellow  { background-color: #eec111; }
.black   { background-color: #000; }

/* -------------------- Colors: Text */
.slate select   { color: #000; }
.green select   { color: #fff; }
.blue select    { color: #fff; }
.yellow select  { color: #000; }
.black select   { color: #fff; }


/* -------------------- Select Box Styles: danielneumann.com Method */
/* -------------------- Source: http://danielneumann.com/blog/how-to-style-dropdown-with-css-only/ */
#mainselection select {
   border: 0;
   color: #EEE;
   background: transparent;
   font-size: 20px;
   font-weight: bold;
   padding: 2px 10px;
   width: 378px;
   *width: 350px;
   *background: #58B14C;
   -webkit-appearance: none;
}

#mainselection {
   overflow:hidden;
   width:350px;
   -moz-border-radius: 9px 9px 9px 9px;
   -webkit-border-radius: 9px 9px 9px 9px;
   border-radius: 9px 9px 9px 9px;
   box-shadow: 1px 1px 11px #330033;
   background: #58B14C url("http://i62.tinypic.com/15xvbd5.png") no-repeat scroll 319px center;
}


/* -------------------- Select Box Styles: stackoverflow.com Method */
/* -------------------- Source: http://stackoverflow.com/a/5809186 */
select#soflow, select#soflow-color {
   -webkit-appearance: button;
   -webkit-border-radius: 2px;
   -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
   -webkit-padding-end: 20px;
   -webkit-padding-start: 2px;
   -webkit-user-select: none;
   background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);
   background-position: 97% center;
   background-repeat: no-repeat;
   border: 1px solid #AAA;
   color: #555;
   font-size: inherit;
   margin: 20px;
   overflow: hidden;
   padding: 5px 10px;
   text-overflow: ellipsis;
   white-space: nowrap;
   width: 300px;
}

select#soflow-color {
   color: #fff;
   background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#779126, #779126 40%, #779126);
   background-color: #779126;
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
   padding-left: 15px;
}

label.btn span {
  font-size: 1.5em ;
}

label input[type="radio"] ~ i.fa.fa-circle-o{
    color: #c8c8c8;    display: inline;
}
label input[type="radio"] ~ i.fa.fa-dot-circle-o{
    display: none;
}
label input[type="radio"]:checked ~ i.fa.fa-circle-o{
    display: none;
}
label input[type="radio"]:checked ~ i.fa.fa-dot-circle-o{
    color: #7AA3CC;    display: inline;
}
label:hover input[type="radio"] ~ i.fa {
color: #7AA3CC;
}

label input[type="checkbox"] ~ i.fa.fa-square-o{
    color: #c8c8c8;    display: inline;
}
label input[type="checkbox"] ~ i.fa.fa-check-square-o{
    display: none;
}
label input[type="checkbox"]:checked ~ i.fa.fa-square-o{
    display: none;
}
label input[type="checkbox"]:checked ~ i.fa.fa-check-square-o{
    color: #7AA3CC;    display: inline;
}
label:hover input[type="checkbox"] ~ i.fa {
color: #7AA3CC;
}

div[data-toggle="buttons"] label.active{
    color: #7AA3CC;
}

div[data-toggle="buttons"] label {
display: inline-block;
padding: 6px 12px;
margin-bottom: 0;
font-size: 10px;
font-weight: normal;
line-height: 1em;
text-align: left;
white-space: nowrap;
vertical-align: top;
cursor: pointer;
background-color: none;
border: 0px solid 
#c8c8c8;
border-radius: 0px;
color: #c8c8c8;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
-o-user-select: none;
user-select: none;
}

div[data-toggle="buttons"] label:hover {
color: #7AA3CC;
}

div[data-toggle="buttons"] label:active, div[data-toggle="buttons"] label.active {
-webkit-box-shadow: none;
box-shadow: none;
}



  </style>
  <div id="graph-container"></div>
  <div id="control-pane">
    <h2 class="underline">Your Relationship</h2>
    
   
    <div>
      <h3>Relationship</h3>
	  <div class="styled-select green rounded">
      <select id="node-category" onchange="location = this.value;">
    <option value="combine.php" >All categories</option>
		 <option value="followingmap.php">Following </option>
		  <option value="#" selected>Followers </option>
      </select>
	  </div>
    </div>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-2.1.0.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>



    <span class="line"></span>
	

		<div>
	 <h4>Friends Categories</h4>
	
<form action="./checkboxform_basicc.php" method="post">
	<p>
		<br/>
	
		<input type="radio" name="formDoor[]" value="A" />Activeness by likes<br />
		<input type="radio" name="formDoor[]" value="B" />Activeness by tweets<br />
		<input type="radio" name="formDoor[]" value="C" />Activeness by number of friends<br />
	<input type="radio" name="formDoor[]" value="D" />Activeness by popularity<br />
	</p>
	
	<input type="submit" name="formSubmit" value="Submit" />
</form>

<p>
<span class="line"></span>
	  <h5>Graph Style</h5>
	  <div class="styled-select green rounded">
      <select id="node-category" onchange="location = this.value;">
		 <option value="basicc_log.php">Log Graph </option>
		  <option value="#" selected>Linear Graph</option>   
      </select>
	  
	  </div>
	</div>
	<?php



  $m = new MongoClient();
  $db = $m->mydb;
  $collection = $db->user;
  $query = array('ename'=>$_SESSION['name']);
  $cursor = $collection->find($query);
  $doc = $cursor->getNext();

// Create connection
$m = new MongoClient('mongodb://localhost:27017');
$db = $m->mydb;
$collection = $db->user;
$query = array('ename'=>$_SESSION['name']);
$cursor = $collection->find($query);
$doc = $cursor->getNext();
$frinz = array_values($doc['twitter']['friends']['name']); // friends 
$activen = array_values($doc['twitter']['friends']['favorites']); // friends 

$arrz = array_keys($doc['twitter']['Strength']['0']); //streangth key values (names)

$count=-1;
$arrzz = array_values($doc['twitter']['Strength']['0']); // streangth values 

$total = array();
$frinz = array_unique($frinz);
//print_r($frinz);
 foreach($arrz as $value)  // number of strengths 
 {
$count++;

 }
 $countt = -1;
 
 
  foreach($frinz as $value)  // number of friends 
 {
$countt++;
array_push($total,0);
 }

 
 $fri = array();
  $ffri = array();
 $stri = array();
 $nfri = array();
 $tstr = array();
  
  for ($i=0; $i<=$count; $i++)
  {
	 for ($j=0; $j<=$countt; $j++)
  {
	  if($arrz[$i]==$frinz[$j])
	  {
		   array_push($fri,$j);
		  array_push($stri,$i);
		  $total[$j] = $arrzz[$i];
	  }
	 
  } 

  }
   $totall = array_sum($total);
   //echo $totall;
   
 for ($i=0; $i<=$countt; $i++)
  {
	  $a = $totall - $total[$i];
	  array_push ($tstr,$a);
  }
  $l= $countt;
//  print_r($tstr);
  
 if(isset($_POST["passengers"])){
    //echo "Number of selected friends are:".$_POST["passengers"];
    // Your Slider value is here, do what you want with it. Mail/Print anything..
} else{
Echo "Please slide the Slider Bar and Press Submit.";
$_POST["passengers"]= $totall;
}

 $finalval=$_POST["passengers"];
 
 $indexval=array();
 $ftstr=array();
 $fname=array();
 $factiv=array();
   foreach($_SESSION['name'] as $value) {
	$name=$value;
	//echo $name;
	
}
  array_push($fname,$name);
  array_push($ftstr,0);
  array_push($factiv,3600000);
  
 for ($i=0;$i<=$countt;$i++)
 {
	 if($tstr[$i]<=$finalval)
	 {
		 array_push($indexval, $i);
		 array_push($ftstr,$tstr[$i]);
		 array_push($fname,$frinz[$i]);
		 array_push($factiv,$activen[$i]);
	 }
 }
 
 
 //print_r($ftstr);
// echo  '<br />' ;
// print_r($fname);
// echo  '<br />' ;
// print_r($factiv);
// echo  '<br />' ;
 $loopval = -1;
 foreach($ftstr as $value)
 {
	 $loopval++;
 }
?>
<div>
     <form action="" method="POST">
    <input type="range" min="1" max="<?php  echo $totall; ?>" step="1" value="1" id="foo" name="passengers" onchange='document.getElementById("bar").value = "Slider Value = " + document.getElementById("foo").value;'/>
<input type="text" name="bar" id="bar" value="1" disabled />
<br />

<input type=submit value=Submit />


</form>
    </div>
	 <span class="line"></span>
    <div>
   <form action="./basicc.php">
  

      <button id="reset-btn" input type="submit" class="button button3" value="reset" />Reset</button>
  
	  </form>
	      <span class="line"></span>
	  <form action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="post">
	     <button id="export-btn" input type="submit" name="formSubmit" value="Submit" class="button">Export</button>
	   </form>
	    <form action="../../main/index.php" method="post">
	     <button id="export-btn" input type="submit" name="formSubmit" value="Submit" class="button">Home</button>
	   </form>
    </div>
    <div id="dump" class="hidden"></div>
  </div>
</div>
<?php

if(isset($_POST['formSubmit'])) 
    {
		$data = array();
$data['friends'] = $fname;
$data['activeness'] = $factiv;
$data['strength'] = $ftstr;


//format the data
$formattedData = json_encode($data);

//set the filename
$filename = 'followersrelationship.json';

//open or create the file
$handle = fopen($filename,'w+');

//write the data into the file
fwrite($handle,$formattedData);

//close the file
fclose($handle);
	}

$data = array();
 $cy = array();

// Push the data into the array

     

//echo json_encode($cy);




 //echo $equa;

 $arrl1 = array();
 $edges = array();
 $nodes = array();
  foreach($_SESSION['name'] as $value) {
	$name=$value;
	//echo $name;
	
}
//echo $name;
 for($i=0; $i<=$loopval; $i++)
 {
	 array_push($nodes, array(
            "id" =>$fname[$i],
			"label" => $fname[$i],			
			"x" =>rand() ,
			"y" => rand(),
			"size" => $factiv[$i]*300,
	 "color"=> '#008080'
			)
			);
			
 }
 for($i=0; $i<=$loopval; $i++)
 {
	 array_push($edges, array(
            "id" =>$i,
			"source" => $fname[0],
			"target" => $fname[$i],
			"size" => $ftstr[$i],
			 "color"=> '#000000'
			)
			);
 }
 $g= array (
   'nodes' => $nodes,
   'edges' => $edges
);
//php object creation 
//print_r(array_keys($g));
$p = (object) $g;
//json_encode($g);
 //json_encode($edges);
 //echo "<script>console.log('" . json_encode($p) . "');</script>";

 ?>
<script>
    
	var g = <?php echo json_encode($p);?>;
console.log(g);
	s = new sigma({	
  graph: g,
  container: 'graph-container'

});


</script>
