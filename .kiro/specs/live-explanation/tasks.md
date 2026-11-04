# Tasks: live explanation

- [x] Shared prompt builders in `protocol.ts`
- [x] JSON gate that returns null instead of a partial lesson
- [x] Web server functions `explainStuck` and `clarifyStep`
- [x] API `POST /v1/sessions` with `prompt` and `POST /v1/sessions/:id/clarify`
- [x] Honest unavailable state when `XAI_API_KEY` is absent
- [ ] Stream tokens only if the gate can still reject a bad final object
