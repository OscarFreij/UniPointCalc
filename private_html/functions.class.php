<?php

class functions
{
    public $courseData;
    public $jsonLocation = "../private_html/courses.json";

    public function GetCourseData()
    {
        try
        {
            $myfile = fopen($this->jsonLocation, "r") or die("Unable to open file!");
            $fileContent = fread($myfile,filesize($this->jsonLocation));
            fclose($myfile);

            $this->courseData = json_decode($fileContent, true);
        }
        catch (Exeptiopn $e)
        {
            echo "Error: ".$e->getMessage();
        }
    }
}