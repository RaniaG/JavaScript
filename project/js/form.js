var _name=document.getElementsByName("name")[0];
var age=document.getElementsByName("age")[0];
var phone=document.getElementsByName("phone")[0];
var email=document.getElementsByName("email")[0];
var gender=document.getElementsByName("gender");
var submitBtn=document.querySelector(".form-btn input");
var form=document.getElementsByTagName("form")[0];

function validation(condition,type,typeString,errorMessage){
    if(condition)
    {
        if(!document.contains(document.querySelector(".error[inputType='"+typeString+"']")))
        {
            var error=document.createElement("div");
            error.setAttribute("class",'error');
            error.setAttribute("inputType",typeString)
            type.parentElement.prepend(error);
        }
        else{
            var error=document.querySelector(".error[inputType='"+typeString+"']");
        }
        if(type.value.length==0)
            error.innerText=typeString+" is required";
        else 
            error.innerText=errorMessage;

        return false;
    }
    if(document.contains(document.querySelector(".error[inputType='"+typeString+"']")))
        document.querySelector(".error[inputType='"+typeString+"']").remove();
    return true;
}

submitBtn.addEventListener("click",function(){
    console.log("btn clicked");
    var validateName=validation(
        !/^(([a-zA-Z]+[ ]?[a-zA-Z]+)+)$/.test(_name.value),
        _name,
        "name",
        "enter only letters in name (valid format: name name)");
    var validateAge=validation(
        isNaN(Number(age.value))||age.value.length==0||age.value>100||age.value<0,
        age,
        'age',
        "enter only numbers in age (value between 0 and 100)"
    );
    var validatePhone=validation(
        !/^(01[012][0-9]{8})$/.test(phone.value),
        phone,
        'phone',
        "enter only numbers in mobile number (format: 01(0,1,2)XXXXXXXX)"
    );
    var validateEmail=validation(
        !/^([\w.-]+@([a-zA-Z]+\.[a-zA-Z]+)+)$/.test(email.value),
        email,
        'email',
        "enter valid email format"
    );

    if(validateName)
        console.log("valid name");
    else console.log("invalid name");
    if(validateAge)
        console.log("valid age");
    else console.log("invalid age");
    if(validatePhone)
        console.log("valid phone");
    else console.log("invalid phone");
    if(validateEmail)
        console.log("valid email");
    else console.log("invalid email");
    if(validateAge&&validateEmail&&validatePhone&&validateName)
        form.submit();
        
});
gender[0].checked=true;
