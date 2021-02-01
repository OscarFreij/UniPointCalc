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
        </div>
        <div id="input_wrapper" class="container mb-3">
            <span>Input Wrapper Content</span>

            <div id="course_wrapper">

            </div>

            
        </div>
        <div id="control_wrapper" class="container mb-3">
            <span>Control Wrapper Content</span>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AnswerModal">
                Kalkulera
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddCourseModal">
                Lägg till kurs
            </button>
        </div>
    </div>

    <!--ModalSection START-->
    <?php
    require "modal.php";
    ?>
    <!--ModalSection End-->
    
    <!--Loading gif-->
    <img id="loadingGif" src="static/media/loading.gif" alt="" style="display: none;">

    <!--Bootstrap JS Scripts (Popper.js & Bootstrap.js)-->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="static/js/main.js"></script>
</body>
</html>