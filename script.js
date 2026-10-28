import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBA-Ig0zD56bsoi3C0YVhC5iEEYzcpX96A",
  authDomain: "karka-website-1fea7.firebaseapp.com",
  projectId: "karka-website-1fea7",
  storageBucket: "karka-website-1fea7.firebasestorage.app",
  messagingSenderId: "1072444835839",
  appId: "1:1072444835839:web:b208540bd16fc3f33809ce",
  measurementId: "G-TC2CMQQ5N1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const paths = [
  { id: "school", label: "School Students", steps: [["Play & think", "Puzzles and block-style thinking build problem-solving habits."], ["Learn the basics", "Start one language or web basics at a gentle pace."], ["Make mini projects", "Build small games and pages to show your family."], ["Share & level up", "Present your work and pick the next course."]], groups: [
    { title: "Courses for School Students", img: "image1", icon: "🎒", courses: [
      ["Python for Kids", "3 Months"], ["Java Basics for School Students", "4 Months"],
      ["HTML & CSS for Beginners", "3 Months"], ["JavaScript for Young Coders", "3 Months"] ] } ] },

  { id: "college", label: "College Students", steps: [["Find your skill gap", "Choose what your syllabus doesn't cover."], ["Learn the tools", "Hands-on classes using industry tools."], ["Do a real-style project", "Apply the skill to an internship-style task."], ["Build your portfolio", "Collect your work for resumes and interviews."]], groups: [
    { title: "Courses for College Students", img: "i2", icon: "🎓", courses: [
      ["UI/UX Design Internship", "3 Months"], ["Advanced Python for Automation", "2 Months"],
      ["Java Backend with Spring Boot", "2 Months"], ["Advanced React Architecture", "2 Months"],
      ["SQL & Database Architecture Mastery", "2 Months"] ] } ] },

  { id: "grad", label: "Graduates", steps: [["Foundations", "Programming or tool basics for your chosen field."], ["Core skills", "Go deep on the main stack or tools."], ["Real projects", "Build end-to-end projects, not just exercises."], ["Interview prep", "Resume review, mock interviews and practice."], ["Job ready", "Apply with a portfolio and confidence."]], groups: [
    { title: "Coding & Development", img: "i3", icon: "💻", courses: [
      ["MERN Fullstack Development", "6 Months"], ["React + Java Full Stack Development", "6 Months"],
      ["React + Python Full Stack Development", "6 Months"] ] },
    { title: "Generative AI (Gen AI)", img: "i4", icon: "✨", courses: [
      ["Generative AI Foundations", "3 Months"], ["Generative AI Mastery", "6 Months"],
      ["Gen AI & LLM Developer", "6 Months"] ] },
    { title: "Data Science & AI", img: "i5", icon: "🤖", courses: [
      ["AI & Data Science", "6 Months"], ["Data Analytics with AI", "5 Months"],
      ["Data Engineering & Big Data Pipelines", "6 Months"] ] },
    { title: "UI/UX & Design", img: "i6", icon: "🎨", courses: [
      ["UI/UX Design", "4 Months"], ["Web Designing", "3 Months"],
      ["Graphic Designing & Branding", "3 Months"] ] },
    { title: "Digital Media & Animation", img: "i7", icon: "🎬", courses: [
      ["Video Editing", "4 Months"], ["Social Media Graphic Design", ""],
      ["Multimedia & Animation", "6 Months"] ] },
    { title: "Content & Digital Marketing", img: "i8", icon: "📣", courses: [
      ["Digital Marketing", "4 Months"], ["SEO Analyst", "3 Months"],
      ["Storytelling & Content Writing", "3 Months"] ] },
    { title: "Advanced Tech & DevOps", img: "i9", icon: "☁️", courses: [
      ["Cloud & DevOps Engineering", "6 Months"], ["QA Automation Testing", "4 Months"],
      ["Mobile App Development", "5 Months"] ] } ] },
  { id: "pro", label: "Professionals", steps: [["Assess", "Match a course to your current role and goal."], ["Targeted upskilling", "Learn only what you need, at your pace."], ["Apply at work", "Use the new skills on live tasks."], ["Grow", "Take bigger responsibilities or switch roles."]], groups: [
    { title: "Business & Management", img: "i10", icon: "📊", courses: [
      ["HR & Finance Management", ""], ["Tally Prime & Accounting", ""], ["Business Analyst", ""] ] } ] }
];
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
const $ = id => document.getElementById(id);
const select = $("course");
const courseArea = $("courseArea");
const tabsBox = $("tabs");
const note = $("resultNote");
const searchBox = $("search");
const pathSteps = $("pathSteps");
const allNames = new Set();
const months = [];
paths.forEach(p => p.groups.forEach(g => g.courses.forEach(([name, dur]) => {
  allNames.add(name);
  const m = parseInt(dur, 10);
  if (m) months.push(m);
})));
$("statCourses").textContent = allNames.size;
$("statPaths").textContent = paths.length;
$("statRange").textContent = Math.min(...months) + "–" + Math.max(...months) + " mo";

allNames.forEach(name => {                         
  const o = el("option", "", name); o.value = name; select.appendChild(o);
});
const slug = n => n.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function makeCard(name, dur, img) {
  const card = el("article", "card");
  const pic = document.createElement("img");        
  const tries = [                                        
    "images/photos/" + slug(name) + ".jpg",             
    "images/courses/" + slug(name) + ".svg",              
    "images/" + img + ".svg"                     
  ];
  let t = 0;
  pic.src = tries[0];
  pic.addEventListener("error", () => { if (++t < tries.length) pic.src = tries[t]; });
  pic.alt = "";
  pic.loading = "lazy";
  pic.className = "thumb";
  card.appendChild(pic);
  card.appendChild(el("h4", "", name));
  const meta = el("div", "meta");
  if (dur) meta.appendChild(el("span", "", "🕒 " + dur));
  meta.append(el("span", "", "Online"), el("span", "", "Batch starts soon"));
  card.appendChild(meta);
  const go = el("button", "go", "Enquire about this course");
  go.type = "button";
  go.addEventListener("click", () => {
    select.value = name;
    $("enroll").scrollIntoView({ behavior: "smooth" });
  });
  card.appendChild(go);
  return card;
}

function drawGroups(groups) {
  courseArea.replaceChildren();
  groups.forEach((g, i) => {
    const box = el("div", "group");
    box.appendChild(el("h3", "", g.title));
    const cards = el("div", "cards");
    g.courses.forEach(([name, dur]) => cards.appendChild(makeCard(name, dur, g.img)));
    box.appendChild(cards);
    courseArea.appendChild(box);
  });
}

function drawSteps(id) {
  pathSteps.replaceChildren();
  const p = paths.find(x => x.id === id);
  pathSteps.appendChild(el("h3", "", "How the " + p.label + " learning path works"));
  const list = el("ol", "timeline");
  p.steps.forEach(([title, text], i) => {
    const li = el("li");
    li.append(el("span", "num", String(i + 1)), el("h4", "", title), el("p", "", text));
    list.appendChild(li);
  });
  pathSteps.appendChild(list);
}

let activeId = "grad";
function showTab(id) {
  activeId = id;
  tabsBox.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.id === id)));
  note.textContent = "";
  drawSteps(id);
  drawGroups(paths.find(p => p.id === id).groups);
}

paths.forEach(p => {
  const t = el("button", "tab", p.label);
  t.type = "button"; t.dataset.id = p.id; t.setAttribute("role", "tab");
  t.addEventListener("click", () => { searchBox.value = ""; showTab(p.id); });
  tabsBox.appendChild(t);
});

// live search across every path
searchBox.addEventListener("input", () => {
  const q = searchBox.value.replace(/[<>]/g, "").trim().toLowerCase().slice(0, 40);
  if (!q) return showTab(activeId);
  const seen = new Set();
  const hits = [];
  paths.forEach(p => p.groups.forEach(g => g.courses.forEach(([name, dur]) => {
    if (name.toLowerCase().includes(q) && !seen.has(name)) { seen.add(name); hits.push({ name, dur, img: g.img }); }
  })));
  tabsBox.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", "false"));
  courseArea.replaceChildren();
  pathSteps.replaceChildren();
  if (!hits.length) {
    note.textContent = "";
    courseArea.appendChild(el("p", "empty", "No course found. Try another word."));
    return;
  }
  note.textContent = hits.length + " course" + (hits.length > 1 ? "s" : "") + " found";
  const cards = el("div", "cards");
  hits.forEach((h, i) => cards.appendChild(makeCard(h.name, h.dur, h.img)));
  courseArea.appendChild(cards);
});
showTab("grad");
const clean   = s => s.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
const nameOk  = s => /^[A-Za-z\u0B80-\u0BFF .'-]{2,60}$/.test(s);
const emailOk = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 100;
const phoneOk = s => /^[6-9]\d{9}$/.test(s);

const form = document.getElementById("enquiryForm");
const submitBtn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");
const honeypot = document.getElementById("website");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (honeypot && honeypot.value) {
      return;
    }
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value.trim();
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      msg.textContent = "Please enter a valid 10-digit phone number starting with 6-9.";
      msg.style.color = "red";
      return;
    }

    if (!course) {
      msg.textContent = "Please select a course.";
      msg.style.color = "red";
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    msg.textContent = "";

    try {
      await addDoc(collection(db, "enquiries"), {
        name: name,
        email: email,
        phone: phone,
        course: course,
        createdAt: serverTimestamp()
      });
      msg.textContent = "Enquiry submitted successfully! We will call you back.";
      msg.style.color = "#00ff66";
      form.reset();
    } catch (error) {
      console.error("Firestore submission error:", error);
      msg.textContent = "Failed to submit enquiry. Please try again.";
      msg.style.color = "red";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send enquiry";
    }
  });
}