import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { OrganizationForm } from "../../create-organization/organization-form";

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create organization🥳😍🤩</SheetTitle>
        </SheetHeader>
        <div className="py-4">
        <OrganizationForm />
        </div>

      </SheetContent>

    </Sheet>
  )
}