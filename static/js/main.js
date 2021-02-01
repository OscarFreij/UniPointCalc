var dataObject = new Object();
var merit_dataObject = new Object();
var display_wrapper;

window.onload = (event) => {
    Init();
    console.log('page is fully loaded');
};

function Init()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dataObject = JSON.parse(this.responseText);
            document.getElementById("loadingGif").style.display = "none";
            LoadCategory();
        }
    };
    xhttp.open("POST", "data/courses.json", true);
    xhttp.send();
    document.getElementById("loadingGif").style.display = "block";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            merit_dataObject = JSON.parse(this.responseText);
            document.getElementById("loadingGif").style.display = "none";
        }
    };
    xhttp.open("POST", "data/merit_data.json", true);
    xhttp.send();
    document.getElementById("loadingGif").style.display = "block";
}

function CheckIfMeritAvailable(courseCode)
{
    var result = false;
    merit_dataObject.categories.forEach(category => {
        category.courses.forEach(course => {
            console.log(course.code+"<|>"+courseCode);
            if (course.code == courseCode)
            {
                result = true;
                return;
            }
        });
    });

    return result;
}

function LoadCategory()
{
    dataObject.categories.forEach(element => {
        var item = document.createElement("option");
        item.value = element.name;
        item.innerText = element.name;

        $('#select_category')[0].appendChild(item);
    });
}

function CheckCategory()
{
    ResetCourses();
    if ($('#select_category')[0].value != "NONE")
    {
        $('#select_course')[0].disabled = false;
        LoadCourse($('#select_category')[0].value);
    }
    else
    {
        $('#select_course')[0].disabled = true;
        $('#select_course')[0].children[0].selected = true;
        // TELL USER HE DID WRONG!
    }
    CheckCourse();
}

function LoadCourse(categoryName)
{
    dataObject.categories.forEach(category => {
        if (category.name == categoryName)
        {
            category.courses.forEach(element => {
                var item = document.createElement("option");
                item.value = element.code;
                item.innerText = element.name+" - "+element.points+"p";
        
                $('#select_course')[0].appendChild(item);
            });
        }
    });
}

function ResetCourses()
{
    $('#select_course')[0].innerHTML = '<option value="NONE" selected>Välj kurs...</option>\n<!-- Add Courses here! -->';
}

function CheckCourse()
{
    $('#select_grade')[0].children[0].selected = true;
    $('#isMeritCourse')[0].checked = false;
    if ($('#select_course')[0].value != "NONE")
    {
        $('#select_grade')[0].disabled = false;
        if (CheckIfMeritAvailable($('#select_course')[0].value))
        {
            $('#isMeritCourse')[0].parentElement.style.display = "block";
        }
        else
        {
            $('#isMeritCourse')[0].parentElement.style.display = "none";
        }
    }
    else
    {
        $('#select_grade')[0].disabled = true;
        $('#isMeritCourse')[0].parentElement.style.display = "none";
        // TELL USER HE DID WRONG!
    }
}