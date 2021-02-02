var dataObject = new Object();
var merit_dataObject = new Object();
var selectedCourses = new Object();
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


    selectedCourses.courses = new Array();
}

function CheckIfMeritAvailable(courseCode)
{
    var result = false;
    merit_dataObject.categories.forEach(category => {
        category.courses.forEach(course => {
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

function ClearAddMenu()
{
    ResetCourses();
    $('#select_category')[0].children[0].selected = true;
    $('#select_course')[0].disabled = true;
    $('#select_grade')[0].children[0].selected = true;
    $('#select_grade')[0].disabled = true;
    $('#isMeritCourse')[0].checked = false;
    $('#isMeritCourse')[0].parentElement.style.display = "none";
}

function AddRow()
{
    var modal = bootstrap.Modal.getInstance($('#AddCourseModal')[0]);
    document.getElementById("loadingGif").style.display = "block";
    if ($('#select_grade')[0].value != "NONE")
    {
        var courseItem = new Object();
        courseItem.code = $('#select_course')[0].value;
        courseItem.grade = $('#select_grade')[0].value;
        courseItem.isMerit = $('#isMeritCourse')[0].checked;

        var courseName = "";
        dataObject.categories.forEach(category => {
            category.courses.forEach(course => {
                if (course.code == courseItem.code)
                {
                    courseName = course.name;
                }
            });
        });


        var element = document.createElement("li");
        element.classList.add("list-group-item");

        if (courseItem.isMerit == true)
        {
            element.classList.add("list-group-item-warning");
        }

        element.classList.add("course-list-item");
        element.classList.add("row");

        element.appendChild(document.createElement("span"));
        element.appendChild(document.createElement("span"));

        element.children[0].classList.add("col-10");
        element.children[0].innerText = courseName;
        element.children[1].classList.add("col-2");
        element.children[1].innerText = courseItem.grade;

        element.setAttribute("onclick", 'OpenRowRemoval("'+courseItem.code+'")');

        courseItem.html = element;

        selectedCourses.courses.push(courseItem);
        modal.hide();
        ReloadList();
        ClearAddMenu();
        document.getElementById("loadingGif").style.display = "none"; 
        DisplayAlertMessage(courseName+" tillagd!",1,2000);
        return true;
    }
    else
    {
        if ($('#select_category')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj kategori!",2,2000);
        }
        else if ($('#select_course')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj kurs!",2,2000);
        }
        else if ($('#select_grade')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj betyg!",2,2000);
        }
        document.getElementById("loadingGif").style.display = "none"; 
        return false;
    }
}

function OpenRowRemoval(courseCode)
{
    var modal = new bootstrap.Modal($('#RemovalConfirmationModal')[0]);
    

    $('#RemovalConfirmationModal').find('.btn-danger')[0].setAttribute("onclick", 'RemoveRow("'+courseCode+'")');

    var courseName = "";
    dataObject.categories.forEach(category => {
        category.courses.forEach(course => {
            if (course.code == courseCode)
            {
                courseName = course.name;
            }
        });
    });

    $('#RemovalConfirmationModal').find('.modal-body')[0].children[1].innerText = courseName;
    

    modal.show();
}

function RemoveRow(courseCode)
{
    for (let i = 0; i < selectedCourses.courses.length; i++) {
        const element = selectedCourses.courses[i];
        
        if (element.code == courseCode)
        {
            selectedCourses.courses.splice(i, 1);
        }
    }
    ReloadList();
    DisplayAlertMessage("Kurs borttagen!",2,2000);
}

function ReloadList()
{
    document.getElementById("loadingGif").style.display = "block";

    var childList = $('#list').find('.course-list-item');
    for (let i = 0; i < childList.length; i++) {
        const element = childList[i];
        element.remove();
    }

    selectedCourses.courses.forEach(element => {
        $('#list')[0].appendChild(element.html);
    });

    document.getElementById("loadingGif").style.display = "none"; 
}

async function DisplayAlertMessage(message, level, timeMs)
{
    var element = document.createElement("div");
    element.role = "alert";
    element.classList.add("fade");
    element.classList.add("show");
    element.classList.add("alert");

    switch (level) {
        case 0:
            element.classList.add("alert-info");
            break;
        case 1:
            element.classList.add("alert-success");
            break;
        case 2:
            element.classList.add("alert-warning");
            break;
        case 3:
            element.classList.add("alert-danger");
            break;
        default:
            break;
    }

    element.innerText = message;
    
    var bsAlert = new bootstrap.Alert(element);

    $('#alertBox')[0].appendChild(element);

    setTimeout(() => {
        bsAlert.close();
    }, timeMs);

}