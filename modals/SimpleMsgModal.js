import Swal from "sweetalert2";

export default function SimpleMsgModal({ icon, title, text }) {
  const icons = ["success", "error", "warning", "info", "question"];

  if (!icons.includes(icon)) {
    console.error(`Invalid icon: ${icon}`);
    return;
  }

  return Swal.fire({
    icon: `${icon}`,
    title: `${title}`,
    text: `${text}`,
    footer: `<a href="#>관리자에게 문의하기</a>`
  });
}
