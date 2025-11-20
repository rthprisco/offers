import fs from "fs"
import path from "path"
import process from "process"

// Configuração
const SONAR_PROPERTIES_FILE = path.join(process.cwd(), "sonar-project.properties")
const REPORT_FILE = path.join(process.cwd(), "SONAR_REPORT.md")

// Função para ler propriedades do arquivo
function getSonarProperties() {
  if (!fs.existsSync(SONAR_PROPERTIES_FILE)) {
    console.error(`[Erro] Arquivo ${SONAR_PROPERTIES_FILE} não encontrado.`)
    process.exit(1)
  }

  const content = fs.readFileSync(SONAR_PROPERTIES_FILE, "utf-8")
  const props = {}

  content.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=")
      if (key && valueParts.length > 0) {
        props[key.trim()] = valueParts.join("=").trim()
      }
    }
  })

  return props
}

async function generateReport() {
  const props = getSonarProperties()
  const projectKey = props["sonar.projectKey"]
  const token = props["sonar.token"]
  const hostUrl = props["sonar.host.url"] || "http://localhost:9000"

  if (!projectKey || !token) {
    console.error("[Erro] sonar.projectKey ou sonar.token não encontrados no arquivo sonar-project.properties")
    process.exit(1)
  }

  console.log(`Gerando relatório para o projeto: ${projectKey}...`)

  const metrics = [
    "bugs",
    "vulnerabilities",
    "code_smells",
    "coverage",
    "duplicated_lines_density",
    "ncloc", // Linhas de código
    "sqale_index", // Débito técnico (minutos)
    "alert_status", // Quality Gate status
  ].join(",")

  const url = `${hostUrl}/api/measures/component?component=${projectKey}&metricKeys=${metrics}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa(token + ":"),
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.component || !data.component.measures) {
      console.error('[Erro] Nenhuma medida encontrada. Você já rodou o "sonar-scanner"?')
      process.exit(1)
    }

    const measures = {}
    data.component.measures.forEach((m) => {
      measures[m.metric] = m.value
    })

    // Formatar valores
    const statusEmoji = measures.alert_status === "OK" ? "✅ Aprovado" : "❌ Reprovado"
    const coverage = measures.coverage ? `${measures.coverage}%` : "N/A"
    const duplications = measures.duplicated_lines_density ? `${measures.duplicated_lines_density}%` : "N/A"
    const debt = measures.sqale_index ? `${Math.round(measures.sqale_index / 60)}h` : "N/A"

    const reportContent = `
# Relatório de Qualidade de Código - SonarQube
**Data:** ${new Date().toLocaleString()}
**Projeto:** ${projectKey}
**Status do Quality Gate:** ${statusEmoji}

## Métricas Principais

| Métrica | Valor | Descrição |
|---------|-------|-----------|
| 🐞 Bugs | **${measures.bugs || 0}** | Erros de código que precisam ser corrigidos |
| 🔓 Vulnerabilidades | **${measures.vulnerabilities || 0}** | Falhas de segurança |
| 💩 Code Smells | **${measures.code_smells || 0}** | Código confuso ou difícil de manter |
| ☂️ Cobertura de Testes | **${coverage}** | Porcentagem de código coberto por testes |
| 👯 Duplicações | **${duplications}** | Porcentagem de código duplicado |
| 📏 Linhas de Código | **${measures.ncloc || 0}** | Total de linhas de código (sem comentários) |
| 💸 Débito Técnico | **${debt}** | Tempo estimado para corrigir os problemas |

---
*Gerado automaticamente via script local.*
    `.trim()

    fs.writeFileSync(REPORT_FILE, reportContent)
    console.log(`✅ Relatório gerado com sucesso em: ${REPORT_FILE}`)
  } catch (error) {
    console.error("[Erro] Falha ao conectar com o SonarQube:", error.message)
    console.log("Dica: Verifique se o SonarQube está rodando em " + hostUrl)
  }
}

generateReport()
