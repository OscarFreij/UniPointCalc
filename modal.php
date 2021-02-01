<!-- Answer modal -->
<div class="modal fade" id="AnswerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="AnswerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="AnswerModalLable">Ditt utgångs poäng!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <span>00.00p</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Stäng</button>
            </div>
        </div>
    </div>
</div>

<!-- Removal Confirmation modal -->
<div class="modal fade" id="RemovalConfirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="RemovalConfirmationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="RemovalConfirmationModalLabel">Är du säker?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <span>Är du säker på att du vill ta bort: </span>
                <span>!KURSNAMN!</span>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Ta bort</button>
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Stäng</button>
            </div>
        </div>
    </div>
</div>

<!-- Add course modal -->
<div class="modal fade" id="AddCourseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="AddCourseModalLable" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="AddCourseModalLable">Välj kurs</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <div class="form-floating mb-3">
                    <select class="form-select" id="select_category" aria-label="select_category floating label" onchange="CheckCategory()">
                        <option value="NONE" selected>Välj kategori...</option>
                        <!-- Add Categories here! -->
                    </select>
                    <label for="select_category">Works with selects</label>
                </div>
                <div class="form-floating mb-3">
                    <select class="form-select" id="select_course" aria-label="select_course floating label" onchange="CheckCourse()" disabled>
                        <option value="NONE" selected>Välj kurs...</option>
                        <!-- Add Courses here! -->
                    </select>
                    <label for="select_course">Works with selects</label>
                </div>
                <div class="form-floating mb-3">
                    <select class="form-select" id="select_grade" aria-label="select_grade floating label" disabled>
                        <option value="NONE" selected>Välj betyg...</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>
                    <label for="select_grade">Works with selects</label>
                </div>
                <div class="form-check form-switch" style="display: none;">
                    <input class="form-check-input" type="checkbox" id="isMeritCourse">
                    <label class="form-check-checkbox-inline" for="isMeritCourse">Merit kurs</label>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="AddRow()">Lägg till</button>
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Stäng</button>
            </div>
        </div>
    </div>
</div>