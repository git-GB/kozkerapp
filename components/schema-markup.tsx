interface SchemaMarkupProps {
  schema: Record<string, any> | Record<string, any>[]
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// Also export as default for compatibility
export default SchemaMarkup
