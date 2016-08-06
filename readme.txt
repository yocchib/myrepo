<!DOCTYPE html>
<html>
 <head>
<meta http-equiv="content-language" content="ja">
<meta charset="UTF-8">
<title> </title>
<script type="text/javascript" src="/js/assert.js"></script>
<link href="/css/assert.css" rel="stylesheet" type="text/css">
 </head>
 <body>
 <script type="text/javascript">
 
    function Person() {}; 
    Person.prototype.dance = function() {}; 
    function Ninja() {}; 
    Ninja.prototype = new Person(); 
    var ninja = new Ninja(); 
    assert(typeof ninja.dance == "function", "ninja は Personを継承"); 
 </script>
  こんにちは SourceTree
 </body>
 </html>

