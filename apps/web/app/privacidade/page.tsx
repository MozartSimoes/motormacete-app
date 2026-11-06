export const metadata = {
  title: 'Política de Privacidade — MotorMacete',
}

export default function PrivacidadePage() {
  return (
    <main style={{ maxWidth: 760, margin: '60px auto', padding: '0 24px', fontFamily: 'sans-serif', lineHeight: 1.7, color: '#fff' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Política de Privacidade</h1>
      <p style={{ color: '#aaa', marginBottom: 32 }}>Última atualização: 30 de junho de 2026</p>

      <p>
        A <strong>MotorMacete</strong> ("nós", "nosso") desenvolveu o aplicativo <strong>MotorMacete</strong> como um serviço comercial.
        Esta página informa sobre nossas políticas de coleta, uso e divulgação de dados pessoais quando você utiliza nosso serviço.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>1. Dados que coletamos</h2>
      <p>Coletamos os seguintes dados para fornecer e melhorar nosso serviço:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Nome</strong> — para identificação da conta e personalização da experiência.</li>
        <li><strong>Endereço de e-mail</strong> — para autenticação, comunicação e recuperação de conta.</li>
        <li><strong>Veículos cadastrados</strong> — marca, modelo, ano e placa informados pelo usuário.</li>
        <li><strong>Histórico de manutenção</strong> — registros de serviços inseridos pelo usuário.</li>
        <li><strong>Conversas com o Mecânico Virtual</strong> — mensagens enviadas ao assistente de IA.</li>
        <li><strong>Ordens de serviço</strong> — apenas para usuários cadastrados como mecânicos.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>2. Como usamos seus dados</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>Fornecer, operar e manter o aplicativo.</li>
        <li>Autenticar o acesso à sua conta.</li>
        <li>Personalizar a experiência de uso.</li>
        <li>Enviar comunicações relacionadas ao serviço (ex.: confirmações de cadastro).</li>
        <li>Melhorar nossos serviços com base no uso agregado.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>3. Cookies e publicidade</h2>
      <p>
        Utilizamos cookies e tecnologias similares para melhorar a experiência no site. Além disso, utilizamos o serviço
        <strong> Google AdSense</strong> para exibição de anúncios. O Google pode usar cookies para exibir anúncios
        baseados em visitas anteriores ao nosso site ou a outros sites na internet.
      </p>
      <p style={{ marginTop: 12 }}>
        Os usuários podem desativar o uso de cookies pelo Google acessando as{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#e05a00' }}>
          Configurações de anúncios do Google
        </a>.
        Alternativamente, você pode desativar o uso de cookies de terceiros acessando{' '}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: '#e05a00' }}>
          aboutads.info
        </a>.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>4. Compartilhamento de dados</h2>
      <p>
        Não vendemos, trocamos nem transferimos seus dados pessoais a terceiros, exceto quando necessário para operar o serviço
        (ex.: provedores de hospedagem, infraestrutura e parceiros de publicidade como o Google AdSense) ou quando exigido por lei.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>5. Retenção de dados</h2>
      <p>
        Mantemos seus dados enquanto sua conta estiver ativa. Ao excluir sua conta, todos os dados associados são
        removidos permanentemente de nossos sistemas. Para excluir sua conta, acesse:{' '}
        <a href="https://motormacete.com.br/conta/excluir" style={{ color: '#e05a00' }}>
          motormacete.com.br/conta/excluir
        </a>.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>6. Segurança</h2>
      <p>
        Adotamos medidas técnicas adequadas para proteger seus dados, incluindo armazenamento de senhas com hash (bcrypt)
        e comunicação via HTTPS. Nenhum método de transmissão pela internet é 100% seguro, mas empenhamo-nos em usar
        meios comercialmente aceitáveis de proteção.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>7. Seus direitos</h2>
      <p>Você tem direito a:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>Acessar os dados que temos sobre você.</li>
        <li>Corrigir dados imprecisos.</li>
        <li>Solicitar a exclusão de seus dados (exclusão de conta).</li>
      </ul>
      <p>Para exercer esses direitos, entre em contato pelo e-mail abaixo.</p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>8. Alterações nesta política</h2>
      <p>
        Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas
        publicando a nova política nesta página com a data de atualização.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>9. Contato</h2>
      <p>
        Em caso de dúvidas sobre esta Política de Privacidade, entre em contato:{' '}
        <a href="mailto:suporte@motormacete.com.br" style={{ color: '#e05a00' }}>suporte@motormacete.com.br</a>
      </p>
    </main>
  )
}
