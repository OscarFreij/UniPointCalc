var dataObject = new Object();
var merit_dataObject = new Object();
var selectedCourses = new Object();
var display_wrapper;

window.onload = (event) => {
    document.getElementById("loadingGif").style.display = "block";
    Init().then(
        function(value) {console.log('page is fully loaded');},
        function(error) {console.error(error);}
    );
    document.getElementById("loadingGif").style.display = "none";    
};

async function Init()
{
    selectedCourses.courses = new Array();
    
    const promise1 = new Promise(function(myResolve, myReject)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                dataObject = JSON.parse(this.responseText);
                LoadCategory();
                myResolve();
            }
            else if (this.readyState == 4 && this.status != 200)
            {
                myReject("Failed to load courses data from data/courses.json");
            }
        };
        xhttp.open("POST", "data/courses.json", true);
        xhttp.send();
    }
    );
    
    
    const promise2 = new Promise(function(myResolve, myReject)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                merit_dataObject = JSON.parse(this.responseText);
                myResolve();
            }
            else if (this.readyState == 4 && this.status != 200)
            {
                myReject("Failed to load merit data from data/merit_data.json");
            }
        };
        xhttp.open("POST", "data/merit_data.json", true);
        xhttp.send();
    }
    );

    

    await Promise.all([promise1, promise2]).then(
        function()
        {
            ImportFromUrl().catch(values => {
                console.error(values);
            }).then(
                function(value) {return Promise.resolve()},
                function(error) {return Promise.reject("Error loading URL")}
            );
        },
        function(error) {return Promise.reject(error)}
    );
    

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

function CalculateMerit()
{
    var totalMerit = 0;
    merit_dataObject.categories.forEach(category => {
        var categoryMerit = 0;
        category.courses.forEach(m_course => {
            selectedCourses.courses.forEach(s_course => {
                if (m_course.code == s_course.code && s_course.isMerit)
                {
                    categoryMerit += parseFloat(m_course.points);
                }
            });
        });
        if (categoryMerit > parseFloat(category.maxPoints))
        {
            categoryMerit = parseFloat(category.maxPoints);
            console.warn("above category limit. reducing merit points!");
        }
        totalMerit += categoryMerit;
    });

    if (totalMerit > 2.5)
    {
        totalMerit = 2.5;
        console.warn("above global limit. reducing merit points!");
    }
    return totalMerit;
}

function CalculateRawScore()
{
    var totalBaseScore = 0;
    var gradeScore = 0;

    selectedCourses.courses.forEach(course => {
        var coursePoints = parseInt(course.points);
        totalBaseScore += coursePoints;
        switch (course.grade) {
            case "A":
                gradeScore += 20 * coursePoints;
                break;
            case "B":
                gradeScore += 17.5 * coursePoints;
                break;
            case "C":
                gradeScore += 15 * coursePoints;
                break;
            case "D":
                gradeScore += 12.5 * coursePoints;
                break;
            case "E":
                gradeScore += 10 * coursePoints;
                break;
            case "F":
                gradeScore += 0 * coursePoints;
                break;
        }
    });

    
    
    var rawScore = parseFloat(gradeScore/totalBaseScore);
    console.log(rawScore);
    return rawScore;
}

function CalculateFinalScore()
{
    var merit = CalculateMerit();
    var rawScore = CalculateRawScore();

    var finalScore = parseFloat((rawScore+merit).toFixed(2));

    var modalBody = $('#AnswerModal').find('.modal-body')[0];
    modalBody.innerHTML = "";

    var elementTotal = document.createElement("span");
    elementTotal.innerText = "Total: "+finalScore+"p";

    var elementMerit = document.createElement("span");
    elementMerit.innerText = "Varav merit: "+merit+"p";

    modalBody.appendChild(elementTotal);
    modalBody.appendChild(document.createElement("br"));
    modalBody.appendChild(elementMerit);

    return finalScore;
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
                    courseItem.points = course.points;
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
        DisplayAlertMessage(courseName+" tillagd!",1,3500);
        return true;
    }
    else
    {
        if ($('#select_category')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj kategori!",2,3500);
        }
        else if ($('#select_course')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj kurs!",2,3500);
        }
        else if ($('#select_grade')[0].value == "NONE")
        {
            DisplayAlertMessage("Välj betyg!",2,3500);
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
    DisplayAlertMessage("Kurs borttagen!",2,3500);
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

function ExportToFile()
{
    document.getElementById("loadingGif").style.display = "block";
    var data = new Object();
    data.courses = new Array();
    selectedCourses.courses.forEach(course => {
        var item = new Object();
        item.code = course.code;
        item.grade = course.grade;
        item.isMerit = course.isMerit;
        data.courses.push(item);
    });

    var downloadObject = document.createElement("a");
    var fileName = new Date().toLocaleString()+".ggc";

    downloadObject.setAttribute('href', 'data:text/plain;charset=utf-8,'+ encodeURIComponent(JSON.stringify(data)));
    downloadObject.setAttribute('download', fileName);

    downloadObject.style.display = 'none';
    document.body.appendChild(downloadObject);

    downloadObject.click();

    document.body.removeChild(downloadObject);
    document.getElementById("loadingGif").style.display = "none";
    DisplayAlertMessage("Laddade ner data till "+fileName, 1, 6000);
}

function ExportToURL()
{
    document.getElementById("loadingGif").style.display = "block";
    var data = new Object();
    data.courses = new Array();
    selectedCourses.courses.forEach(course => {
        var item = new Object();
        item.code = course.code;
        item.grade = course.grade;
        item.isMerit = course.isMerit;
        data.courses.push(item);
    });

    var returnString = window.location.href.split('?')[0]+"?data="+encodeURIComponent(JSON.stringify(data));
    document.getElementById("loadingGif").style.display = "none";

    window.location.replace(returnString);
}

function ImportFromFile()
{
    const importFile = document.getElementById('fileImport').files[0];

    if (importFile == null)
    {
        DisplayAlertMessage("Välje en .ggc fil att läsa in!",3,2500);
        return;
    }

    var reader = new FileReader()

    reader.onload = function() {
        AddMultiRows(JSON.parse(reader.result));
    }

    reader.readAsText(importFile);
}

async function ImportFromUrl()
{
    var searchParam = new URLSearchParams(window.location.search);
    if (searchParam.has("data"))
    {
        var dataObject = new Object();
        var rawData = searchParam.get("data");
        var dataString = decodeURIComponent(rawData);
        dataObject = JSON.parse(dataString);
        console.log(dataObject);
        AddMultiRows(dataObject);
        return Promise.resolve("URL DATA PROCESED");
    }
    else
    {
        return Promise.reject("NO URL DATA");
    }
}

function AddMultiRows(importObject)
{
    //modal.hide(); - close add modal;
    var itemCount = importObject.courses.length;
    do
    {
        var currentCourseItem = importObject.courses.shift();
        var courseItem = new Object();
        courseItem.code = currentCourseItem.code;
        courseItem.grade = currentCourseItem.grade;
        courseItem.isMerit = currentCourseItem.isMerit;

        var courseName = "";
        dataObject.categories.forEach(category => {
            category.courses.forEach(course => {
                if (course.code == courseItem.code)
                {
                    courseName = course.name;
                    courseItem.points = course.points;
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
    }
    while (importObject.courses.length > 0);
    
    if (itemCount == 1)
    {
        DisplayAlertMessage(itemCount+" kurs blev tillagd!",1,3500);
    }
    else
    {
        DisplayAlertMessage(itemCount+" kurser blev tillagda!",1,3500);
    }

    ReloadList();
    document.getElementById("loadingGif").style.display = "none"; 
    return true;
}