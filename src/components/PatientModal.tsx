import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { Lang, PatientRecord } from "types/patient";
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  PRIORITY_ORDER,
  STATUS_ORDER,
} from "constants/catalog";
import { fromDateInput, todayIso, toDateInput } from "utils/date";
import Field from "./Field";
import Check from "./Check";

interface PatientModalProps {
  editing: PatientRecord;
  isNew: boolean;
  onSave: (data: PatientRecord) => void;
  onCancel: () => void;
}

const errorMsgCls = "text-rust text-[11px] font-sans mt-1 tracking-[0.02em]";
const inputCls =
  "border border-ink bg-cream px-3 py-[9px] font-sans text-sm text-ink w-full";

export default function PatientModal({
  editing,
  isNew,
  onSave,
  onCancel,
}: PatientModalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { control, handleSubmit } = useForm<PatientRecord>({
    defaultValues: editing,
  });

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-[rgba(26,26,26,0.55)] flex items-center justify-center p-6 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[620px] max-h-[90vh] bg-cream border border-ink flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
      >
        <div className="px-6 py-5 border-b border-ink flex justify-between items-start">
          <div>
            <div className="font-serif text-[26px] font-medium tracking-[-0.02em]">
              {isNew ? t("addNew") : t("edit")}
            </div>
            {!isNew && (
              <div className="text-[11px] text-[#5a5a5a] mt-1">
                <span className="font-mono">{editing.id}</span>
              </div>
            )}
          </div>
          <button
            onClick={onCancel}
            aria-label="close"
            className="bg-transparent border border-ink w-[30px] h-[30px] text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          <Controller
            control={control}
            name="fullName"
            rules={{ required: t("fullNameRequired") }}
            render={({ field, fieldState }) => (
              <Field label={t("fullName")}>
                <input
                  {...field}
                  className={inputCls}
                  style={{
                    borderColor: fieldState.error ? "#c0392b" : "#1a1a1a",
                  }}
                />
                {fieldState.error && (
                  <div className={errorMsgCls}>
                    {fieldState.error.message}
                  </div>
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-[14px]">
            <Controller
              control={control}
              name="birthDate"
              rules={{ validate: (v) => v.slice(0, 10) <= todayIso() || t("birthDateFuture") }}
              render={({ field, fieldState }) => (
                <Field label={t("birthDate")}>
                  <input
                    type="date"
                    value={toDateInput(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    max={todayIso()}
                    className={inputCls}
                    style={{
                      borderColor: fieldState.error ? "#c0392b" : "#1a1a1a",
                    }}
                  />
                  {fieldState.error && (
                    <div className={errorMsgCls}>
                      {fieldState.error.message}
                    </div>
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="appointmentDate"
              render={({ field }) => {
                const isPastWarning =
                  isNew &&
                  !!field.value &&
                  field.value.slice(0, 10) < todayIso();
                return (
                  <Field label={t("appointment")}>
                    <input
                      type="date"
                      value={toDateInput(field.value)}
                      onChange={(e) => field.onChange(fromDateInput(e.target.value))}
                      className={inputCls}
                      style={{
                        borderColor: isPastWarning ? "#8a6d1f" : "#1a1a1a",
                      }}
                    />
                    {isPastWarning && (
                      <div className="text-amber text-[11px] font-sans mt-1 tracking-[0.02em]">
                        {t("appointmentDatePastWarning")}
                      </div>
                    )}
                  </Field>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            <Controller
              control={control}
              name="department"
              rules={{ required: t("departmentRequired") }}
              render={({ field, fieldState }) => (
                <Field label={t("department")}>
                  <select
                    {...field}
                    className={inputCls}
                    style={{
                      borderColor: fieldState.error ? "#c0392b" : "#1a1a1a",
                    }}
                  >
                    <option value="" disabled>
                      {t("selectDept")}
                    </option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <div className={errorMsgCls}>
                      {fieldState.error.message}
                    </div>
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="bloodType"
              render={({ field }) => (
                <Field label={t("bloodType")}>
                  <select {...field} className={inputCls}>
                    <option value="" disabled>
                      {t("selectBlood")}
                    </option>
                    {BLOOD_TYPES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Field label={t("status")}>
                  <select {...field} className={inputCls}>
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {t(`statuses.${s}`)}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Field label={t("priority")}>
                  <select {...field} className={inputCls}>
                    {PRIORITY_ORDER.map((p) => (
                      <option key={p} value={p}>
                        {t(`priorities.${p}`)}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            />
          </div>

          <Controller
            control={control}
            name="diagnosis_tr"
            render={({ field }) => (
              <Field label={`${t("diagnosis")} (TR)`}>
                <input {...field} className={inputCls} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="diagnosis_en"
            render={({ field }) => (
              <Field label={`${t("diagnosis")} (EN)`}>
                <input {...field} className={inputCls} />
              </Field>
            )}
          />

          {lang === "tr" ? (
            <Controller
              control={control}
              name="note_tr"
              render={({ field }) => (
                <Field label={`${t("note")} (TR)`}>
                  <textarea
                    {...field}
                    rows={3}
                    className={`${inputCls} font-serif`}
                  />
                </Field>
              )}
            />
          ) : (
            <Controller
              control={control}
              name="note_en"
              render={({ field }) => (
                <Field label={`${t("note")} (EN)`}>
                  <textarea
                    {...field}
                    rows={3}
                    className={`${inputCls} font-serif`}
                  />
                </Field>
              )}
            />
          )}

          <Controller
            control={control}
            name="notes"
            rules={{ validate: (v) => (v && v.trim() ? true : t("notesRequired")) }}
            render={({ field, fieldState }) => (
              <Field label={t("notesLabel")}>
                <textarea
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.trim() ? e.target.value : null
                    )
                  }
                  rows={2}
                  className={inputCls}
                  style={{
                    borderColor: fieldState.error ? "#c0392b" : "#1a1a1a",
                  }}
                />
                {fieldState.error && (
                  <div className={errorMsgCls}>
                    {fieldState.error.message}
                  </div>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="score"
            render={({ field }) => (
              <Field label={t("score")}>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-mono min-w-[48px]">
                    {field.value}/5
                  </span>
                </div>
              </Field>
            )}
          />

          <div className="flex gap-[18px] flex-wrap py-1">
            <Controller
              control={control}
              name="isInsured"
              render={({ field }) => (
                <Check
                  label={t("insured")}
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="isFollowUp"
              render={({ field }) => (
                <Check
                  label={t("followUp")}
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="isVaccinated"
              render={({ field }) => (
                <Check
                  label={t("vaccinated")}
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="tags"
            rules={{ validate: (v) => (v && v.length > 0 ? true : t("tagsRequired")) }}
            render={({ field, fieldState }) => (
              <Field label={t("tags")}>
                <input
                  value={(field.value || []).join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="a, b, c"
                  className={inputCls}
                  style={{
                    borderColor: fieldState.error ? "#c0392b" : "#1a1a1a",
                  }}
                />
                {fieldState.error && (
                  <div className={errorMsgCls}>
                    {fieldState.error.message}
                  </div>
                )}
              </Field>
            )}
          />
        </div>

        <div className="px-6 py-4 border-t border-ink flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-transparent border border-ink text-ink px-[18px] py-[9px] text-xs tracking-[0.12em] uppercase"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSubmit(onSave)}
            className="bg-ink border border-ink text-cream px-[22px] py-[9px] text-xs tracking-[0.12em] uppercase font-medium"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
