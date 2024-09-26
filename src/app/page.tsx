import Image from "next/image";
import DateTimePickerForm from "@/components/timePicker/dateTimePickerForm";

export default function Home() {
  return (
    <div className="my-10 max-w-md mx-auto">
      <DateTimePickerForm/>
    </div>
  );
}
