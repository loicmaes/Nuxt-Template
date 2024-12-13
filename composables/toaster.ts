import { useToast } from "~/components/ui/toast";
import type { InternationalizationTool } from "~/types/i18n";

interface ToasterBody {
  title: string;
  description: string;
}
interface ToasterLiteralsReplacements {
  title?: {
    [k: string]: string;
  };
  description?: {
    [k: string]: string;
  };
}

export function useToastBody(t: InternationalizationTool, key: string, replacements?: ToasterLiteralsReplacements): ToasterBody {
  return {
    title: t(`${key}.title`, replacements?.title ?? {}),
    description: t(`${key}.description`, replacements?.description ?? {}),
  };
}

export function toasterSuccess(body: ToasterBody, forcedValue?: boolean): boolean {
  const { toast } = useToast();
  toast({ ...body });
  return forcedValue ?? true;
}
export function toasterError(body: ToasterBody, forcedValue?: boolean): boolean {
  const { toast } = useToast();
  toast({
    ...body,
    variant: "destructive",
  });
  return forcedValue ?? false;
}

export function toasterServerError(t: InternationalizationTool, forcedValue?: boolean): boolean {
  return toasterError(useToastBody(t, "globals.toasts.serverError"), forcedValue);
}
