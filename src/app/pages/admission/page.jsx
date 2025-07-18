import AdmissionForm from "../../../components/pages-items/AdmissionForm";

export async function generateMetadata() {
  return {
    title: "Admission Form - Apply Now",
    description: "Fill the student admission form and get registered online.",
  };
}

export default function AdmissionPage() {
  return <AdmissionForm />;
}
