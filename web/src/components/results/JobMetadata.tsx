export interface JobMetadataProps {
  typicalEducation?: string;
  outlookNote?: string;
}

export function JobMetadata({ typicalEducation, outlookNote }: JobMetadataProps) {
  if (!typicalEducation && !outlookNote) return null;

  return (
    <dl className="space-y-1 text-sm">
      {typicalEducation && (
        <div className="flex gap-2">
          <dt className="font-medium text-text dark:text-text-dark">
            Education:
          </dt>
          <dd className="text-text-muted dark:text-text-muted-dark">
            {typicalEducation}
          </dd>
        </div>
      )}
      {outlookNote && (
        <div className="flex gap-2">
          <dt className="font-medium text-text dark:text-text-dark">
            Outlook:
          </dt>
          <dd className="text-text-muted dark:text-text-muted-dark">
            {outlookNote}
          </dd>
        </div>
      )}
    </dl>
  );
}
