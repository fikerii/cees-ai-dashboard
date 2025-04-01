import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ModalLibrary from "../features/Library/ModalLibrary";

export default function Library() {
  return (
    <div>
      <PageMeta
        title="Library | CS AI"
        description="This is React.js Library page for CS AI"
      />
      <PageBreadcrumb pageTitle="Library Page" />
      <ModalLibrary />
    </div>
  );
}
