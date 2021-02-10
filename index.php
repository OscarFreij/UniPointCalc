<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="static/css/master.css">
    <!--Bootstrap CSS link-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
</head>
<body>
    <div id="wrapper" class="container-fluid text-center">
        <div id="info_wrapper" class="container mb-3">
            <span>Info Wrapper Content</span>
            <input type="file" name="" id="fileImport">
            <button type="button" class="btn btn-info" onclick="ImportFromFile()">Importera .ggc fil här!</button>
        </div>
        <div id="course_wrapper" class="container mb-3">
            <span>Din kurs lista</span>
            <ul id="list" class="list-group container">
                <li class="list-group-item list-group-item-secondary course-list-titel row"><span class="col-10">Kursnamn</span><span class="col-2">Betyg</span></li>
                
            </ul>          
        </div>
        <div id="control_wrapper" class="container mb-3">
            <div class="col-md-12 btn-group" role="group">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#AnswerModal" onclick="CalculateFinalScore()">
                    Kalkulera
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddCourseModal">
                    Lägg till kurs
                </button>
            </div>
        </div>
    </div>



    <!--ModalSection START-->
    <?php
    require "modal.html";
    ?>
    <!--ModalSection End-->
    
    <div id="alertBox" class="container-fluid">

    </div>

    <!--Loading gif-->
    <img id="loadingGif" src="static/media/loading.gif" alt="" style="display: none;">

    <!--Bootstrap JS Scripts (Popper.js & Bootstrap.js)-->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="static/js/main.js"></script>
</body>
</html>