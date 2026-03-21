# Duolingo Engineering Learning Journey

## What I Learned

### TypeScript Type Safety
TypeScript strict mode catches bugs at compile time before they reach students.
Generic types like MessageMetadata<T> allow reusable components across all 10 language courses.
Utility types (Omit, Partial) reduce code duplication.

### Zod Runtime Validation
TypeScript validates at compile time - Zod validates at RUNTIME.
The superRefine feature allows custom content filtering logic.
zodResolver connects Zod schemas directly to React Hook Form validation.

### Content Safety
Multi-layer approach works best: TypeScript types + Zod validation + content filtering.
Educational platforms must protect students from inappropriate content.

### Key Insights
1. Type safety makes code self-documenting
2. Runtime validation complements compile-time safety
3. Content filtering should happen at multiple layers
4. Generic types enable components that work across all language courses
