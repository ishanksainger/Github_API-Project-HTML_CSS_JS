const inputField=document.querySelector("[data-inputField]");
const submitBtn=document.querySelector("[data-btnSubmit]")
const darkLight=document.querySelector("[data-darkLight]");
const datatype=document.querySelector("[data-type]")
const colorChange=document.querySelector('.color-change');
const wrapper=document.querySelector('.wrapper');
const userContainer=document.querySelector('.userinfo-container');
const repo=document.querySelector('.repoClass');
const error=document.querySelector('[data-error]');


colorChange.addEventListener('click',()=>{
    const common=document.querySelectorAll(".common")
    const subclass=document.querySelectorAll(".sub-class")
    const name=document.querySelector("[data-nameHeading]");

    if(datatype.textContent==="Dark"){
        wrapper.classList.add('active');
        submitBtn.classList.add('active');
        userContainer.classList.add('active');
        repo.classList.add('active')
        name.classList.add('active');
        inputField.classList.add('active');
        common.forEach(element => {
            element.classList.add('active');
        });
        subclass.forEach(element => {
            element.classList.add('active');
        });
        datatype.textContent="Light"
        darkLight.src="images/sun-icon.svg"
    }
    else if(datatype.textContent==="Light"){
        wrapper.classList.remove('active');
        submitBtn.classList.remove('active');
        userContainer.classList.remove('active');
        repo.classList.remove('active')
        name.classList.remove('active');
        inputField.classList.remove('active');
        common.forEach(element => {
            element.classList.remove('active');
        });
        subclass.forEach(element => {
            element.classList.remove('active');
        });
        datatype.textContent="Dark";
        darkLight.src="images/moon-icon.svg"
    }
});

defaultData()
async function defaultData(){
    const response=await fetch(`https://api.github.com/users/ishanksainger`);
    const data=await response.json();
    renderData(data);
}


submitBtn.addEventListener("submit", (e)=>{
    e.preventDefault();
    let input=inputField.value;
    if(input == ""){
        error.style.display='inline';
        error.textContent="Enter Username"
    }
    else{
        showData(input);
        inputField.value=""
    }
});

async function showData(input){
    const response=await fetch(`https://api.github.com/users/${input}`);
    const data=await response.json();
    if(data?.message==="Not Found"){
        error.style.display='inline';
        error.textContent="No Records found"
    }
    else{
        renderData(data);
        error.textContent=""
    }
}



function renderData(data){
    const user_image=document.querySelector('.user-image');
    const name=document.querySelector("[data-nameHeading]");
    const joinDate=document.querySelector("[data-joiningDate]");
    const userName=document.querySelector("[data-userName]");
    const bio=document.querySelector(".bio");
    const repos=document.querySelector(".repos");
    const followers=document.querySelector(".followers");
    const following=document.querySelector(".following");
    const location=document.querySelector(".location");
    const email=document.querySelector(".email");
    const twitter=document.querySelector(".twitter");
    const company=document.querySelector(".company")
    const emailLink=document.querySelector('[data-emailLink]')
    const twitterLink=document.querySelector('[data-twitterLink]')
    const linkuserName=document.querySelector('.userName')
    const dateString =data?.created_at;
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    user_image.src=data?.avatar_url;
    
    name.textContent=data?.name;
    
    joinDate.textContent=formattedDate;
    
    userName.textContent=data?.login

    linkuserName.href=`https://github.com/${data?.login}`

    bio.textContent=data?.bio;
    
    repos.textContent=data?.public_repos
    
    followers.textContent=data?.followers
    
    following.textContent=data?.following
    
    location.textContent=data?.location|| 'Not Available'
    
    if(location.textContent==='Not Available'){
        location.style.opacity='0.5'
    }
    else{
        location.style.opacity='1'
    }
    email.textContent=data?.blog || 'Not Available'
    if(email.textContent==='Not Available'){
        email.style.opacity='0.5'
        emailLink.href='#'
    }
    else{
        let url = data?.blog?.trim();
        url="https://" + url;
        emailLink.href=url;
        email.style.opacity='1'
    }
    twitter.textContent=data?.twitter_username || 'Not Available'
    if(twitter.textContent==='Not Available'){
        twitter.style.opacity='0.5'
        twitterLink.href='#'
    }
    else{
        twitterLink.href= `https://twitter.com/${data?.twitter_username}`;
        twitter.style.opacity='1'
    }
    company.textContent=data?.company || 'Not Available'
    if(company.textContent==='Not Available'){
        company.style.opacity='0.5'
    }
    else{
        company.style.opacity='1'
    }
}
