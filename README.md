# API Proxy


来自 https://linux.do/t/topic/554346/602 作为备份

API 代理转发服务，支持部署到 Deno Deploy 或 Supabase Edge Functions。

## 支持的代理

| 路径 | 目标地址 |
|------|----------|
| `/anthropic` | `https://api.anthropic.com` |
| `/cerebras` | `https://api.cerebras.ai` |
| `/claude` | `https://api.anthropic.com` |
| `/cohere` | `https://api.cohere.ai` |
| `/discord` | `https://discord.com/api` |
| `/fireworks` | `https://api.fireworks.ai` |
| `/gemini` | `https://generativelanguage.googleapis.com` |
| `/groq` | `https://api.groq.com/openai` |
| `/huggingface` | `https://api-inference.huggingface.co` |
| `/meta` | `https://www.meta.ai/api` |
| `/novita` | `https://api.novita.ai` |
| `/nvidia` | `https://integrate.api.nvidia.com` |
| `/oaipro` | `https://api.oaipro.com` |
| `/openai` | `https://api.openai.com` |
| `/openrouter` | `https://openrouter.ai/api` |
| `/portkey` | `https://api.portkey.ai` |
| `/reka` | `https://api.reka.ai` |
| `/telegram` | `https://api.telegram.org` |
| `/together` | `https://api.together.xyz` |
| `/xai` | `https://api.x.ai` |

## 部署到 Deno Deploy

1. 在 [Deno Deploy](https://deno.com/deploy) 创建项目
2. 复制 `main_deno.ts` 内容到项目入口文件
3. 部署

## 部署到 Supabase Edge Functions

1. 初始化 Supabase 项目（如果还没有）：
   ```bash
   supabase init
   ```

2. 创建 Edge Function：
   ```bash
   supabase functions new api-proxy
   ```

3. 复制 `main_supabase.ts` 内容到 `supabase/functions/api-proxy/index.ts`

4. 部署：
   ```bash
   supabase functions deploy api-proxy
   ```

## 使用示例

```bash
# 原始请求
curl https://api.openai.com/v1/chat/completions

# 通过代理
curl https://your-proxy-domain/openai/v1/chat/completions
```
