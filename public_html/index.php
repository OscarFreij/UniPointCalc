<?php
require "../private_html/functions.class.php";
$functions = new functions();
$functions->GetCourseData();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

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
                <div id="course_id" class="input-group mw-100 mb-3">
                    <span class="input-group-text w-75">Kursnamn</span>
                    <select class="form-select" id="GradeInputSelection">
                                <option selected>Välj betyg...</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
            </div>

            
        </div>
        <div id="control_wrapper" class="container mb-3">
            <span>Control Wrapper Content</span>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AnswerModal">
                Calculate
            </button>
        </div>
    </div>

    <!--ModalSection START-->
    <?php
    require "../private_html/modal.php";
    ?>
    <!--ModalSection End-->
    
    <!--Bootstrap JS Scripts (Popper.js & Bootstrap.js)-->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
</body>
</html>