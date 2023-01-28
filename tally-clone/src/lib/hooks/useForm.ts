import { get, writable } from "svelte/store";
import { ZodError, type z } from "zod";

type UseFormProps<T> = {
  schema: z.Schema<T>;
  defaultValues: T;
  onSubmitCallback: (values: T) => void;
};

type RefsState<T extends Object> = {
  [key in keyof T]?: HTMLInputElement;
};

type ErrorsState<T extends Object> = {
  [key in keyof T]?: string;
};

export function useForm<T extends Object>({
  schema,
  defaultValues,
  onSubmitCallback,
}: UseFormProps<T>) {
  const form = structuredClone(defaultValues);
  const refs: RefsState<T> = {};
  let errors = writable<ErrorsState<T>>({});
  const formWithProxy = new Proxy(form, {
    set(target, key, value) {
      validateSingleField(target, key, value);
      return Reflect.set(target, key, value);
    },
  });

  function validateSingleField(
    target: T,
    key: string | symbol,
    newValue: string | number | boolean | Array<string | number | boolean>
  ) {
    const formKey = key as keyof T;
    const fieldHasErrror = get(errors)[formKey];

    if (fieldHasErrror) {
      const validateResults = schema.safeParse({ ...target, [key]: newValue });
      if (validateResults.success) {
        errors.set({ ...get(errors), [formKey]: undefined });
      } else {
        // TODO: check issues if key is still there
      }
    }
  }

  function onSubmit() {
    try {
      const parseValues = schema.parse(form);
      onSubmitCallback(parseValues);
    } catch (e) {
      if (e instanceof ZodError<T>) {
        const errorMap: ErrorsState<T> = {};
        for (const issue of e.issues) {
          const formInputKey = issue.path[0].toString() as keyof T;
          errorMap[formInputKey] = issue.message;
        }
        errors.set(errorMap);
        // TODO: focus first error
      } else {
        console.debug(e);
      }
    }
  }

  const resetForm = () => {
    for (const key in form) {
      form[key] = defaultValues[key];
    }
    errors.set({});
  };

  return {
    form: formWithProxy,
    refs,
    errors,
    onSubmit,
    resetForm,
  };
}
