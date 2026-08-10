import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Word from './models/wordModel.js'
import dns from 'dns'

dns.setServers(['8.8.8.8'])
dotenv.config()

const words = [
    // =========================
    // ENGLISH — BASIC
    // =========================

    {
        word: 'abandon',
        meaning: 'to leave someone or something completely',
        example: 'The family had to abandon their house after the flood.',
        synonyms: ['leave', 'desert', 'forsake'],
        language: 'English'
    },
    {
        word: 'accurate',
        meaning: 'correct and without mistakes',
        example: 'The report provides accurate information about the project.',
        synonyms: ['correct', 'precise', 'exact'],
        language: 'English'
    },
    {
        word: 'achieve',
        meaning: 'to successfully reach a goal or result',
        example: 'She worked hard to achieve her academic goals.',
        synonyms: ['accomplish', 'attain', 'reach'],
        language: 'English'
    },
    {
        word: 'adapt',
        meaning: 'to change something to suit a new situation',
        example: 'Students must adapt to different learning environments.',
        synonyms: ['adjust', 'modify', 'alter'],
        language: 'English'
    },
    {
        word: 'adequate',
        meaning: 'enough or satisfactory for a particular purpose',
        example: 'The classroom has adequate equipment for the students.',
        synonyms: ['sufficient', 'enough', 'acceptable'],
        language: 'English'
    },
    {
        word: 'ambitious',
        meaning: 'having a strong desire to achieve something important',
        example: 'He has an ambitious plan to build his own company.',
        synonyms: ['aspiring', 'determined', 'driven'],
        language: 'English'
    },
    {
        word: 'analyse',
        meaning: 'to examine something carefully in order to understand it',
        example: 'We need to analyse the survey results before making a decision.',
        synonyms: ['examine', 'evaluate', 'assess'],
        language: 'English'
    },
    {
        word: 'anxious',
        meaning: 'worried or nervous about something',
        example: 'She felt anxious before the final examination.',
        synonyms: ['worried', 'nervous', 'uneasy'],
        language: 'English'
    },
    {
        word: 'apparent',
        meaning: 'easy to notice or understand',
        example: 'It became apparent that the system had a serious problem.',
        synonyms: ['obvious', 'clear', 'evident'],
        language: 'English'
    },
    {
        word: 'approach',
        meaning: 'a way of dealing with a situation or problem',
        example: 'The team adopted a new approach to software development.',
        synonyms: ['method', 'strategy', 'technique'],
        language: 'English'
    },

    // =========================
    // ENGLISH — INTERMEDIATE
    // =========================

    {
        word: 'beneficial',
        meaning: 'having a useful or positive effect',
        example: 'Regular exercise is beneficial to both physical and mental health.',
        synonyms: ['helpful', 'useful', 'advantageous'],
        language: 'English'
    },
    {
        word: 'coherent',
        meaning: 'logical, clear, and well organised',
        example: 'The student presented a coherent argument.',
        synonyms: ['logical', 'consistent', 'organised'],
        language: 'English'
    },
    {
        word: 'complex',
        meaning: 'consisting of many different and connected parts',
        example: 'The software system has a complex architecture.',
        synonyms: ['complicated', 'intricate', 'sophisticated'],
        language: 'English'
    },
    {
        word: 'considerable',
        meaning: 'large in amount or degree',
        example: 'The project required a considerable amount of time.',
        synonyms: ['substantial', 'significant', 'extensive'],
        language: 'English'
    },
    {
        word: 'consistent',
        meaning: 'always behaving or happening in a similar way',
        example: 'The application provides consistent results.',
        synonyms: ['constant', 'reliable', 'uniform'],
        language: 'English'
    },
    {
        word: 'crucial',
        meaning: 'extremely important for achieving a result',
        example: 'Testing is crucial before releasing the application.',
        synonyms: ['essential', 'critical', 'vital'],
        language: 'English'
    },
    {
        word: 'decline',
        meaning: 'to decrease in amount, quality, or importance',
        example: 'The company experienced a decline in sales.',
        synonyms: ['decrease', 'drop', 'diminish'],
        language: 'English'
    },
    {
        word: 'demonstrate',
        meaning: 'to show clearly that something is true or works',
        example: 'The experiment demonstrates the effectiveness of the method.',
        synonyms: ['show', 'display', 'illustrate'],
        language: 'English'
    },
    {
        word: 'derive',
        meaning: 'to obtain something from a particular source',
        example: 'The researchers derived useful information from the dataset.',
        synonyms: ['obtain', 'extract', 'acquire'],
        language: 'English'
    },
    {
        word: 'diverse',
        meaning: 'including many different types or groups',
        example: 'The university has a diverse student population.',
        synonyms: ['varied', 'different', 'wide-ranging'],
        language: 'English'
    },
    {
        word: 'efficient',
        meaning: 'working well without wasting time, energy, or resources',
        example: 'The new algorithm is more efficient than the previous version.',
        synonyms: ['effective', 'productive', 'economical'],
        language: 'English'
    },
    {
        word: 'emphasise',
        meaning: 'to give special importance to something',
        example: 'The lecturer emphasised the importance of cybersecurity.',
        synonyms: ['stress', 'highlight', 'underline'],
        language: 'English'
    },
    {
        word: 'enhance',
        meaning: 'to improve the quality or value of something',
        example: 'The update enhances the performance of the application.',
        synonyms: ['improve', 'strengthen', 'upgrade'],
        language: 'English'
    },
    {
        word: 'establish',
        meaning: 'to create or set up something that will continue',
        example: 'The company established a new security policy.',
        synonyms: ['create', 'found', 'set up'],
        language: 'English'
    },
    {
        word: 'evaluate',
        meaning: 'to judge the quality, importance, or effectiveness of something',
        example: 'The teacher will evaluate the students performance.',
        synonyms: ['assess', 'judge', 'examine'],
        language: 'English'
    },

    // =========================
    // ENGLISH — ADVANCED
    // =========================

    {
        word: 'facilitate',
        meaning: 'to make an activity or process easier',
        example: 'The platform facilitates communication between students and teachers.',
        synonyms: ['assist', 'enable', 'ease'],
        language: 'English'
    },
    {
        word: 'fundamental',
        meaning: 'basic and essential to a system or idea',
        example: 'Understanding algorithms is fundamental to computer science.',
        synonyms: ['basic', 'essential', 'core'],
        language: 'English'
    },
    {
        word: 'implement',
        meaning: 'to put a plan, idea, or system into operation',
        example: 'The developers implemented a new authentication system.',
        synonyms: ['execute', 'apply', 'introduce'],
        language: 'English'
    },
    {
        word: 'inevitable',
        meaning: 'certain to happen and impossible to avoid',
        example: 'Some changes are inevitable when technology develops.',
        synonyms: ['unavoidable', 'certain', 'inescapable'],
        language: 'English'
    },
    {
        word: 'innovative',
        meaning: 'using new ideas or methods',
        example: 'The startup developed an innovative learning platform.',
        synonyms: ['creative', 'original', 'inventive'],
        language: 'English'
    },
    {
        word: 'integrate',
        meaning: 'to combine different things into one system',
        example: 'The application integrates several external services.',
        synonyms: ['combine', 'merge', 'unify'],
        language: 'English'
    },
    {
        word: 'maintain',
        meaning: 'to keep something in good condition or at the same level',
        example: 'Developers must maintain the system after deployment.',
        synonyms: ['preserve', 'sustain', 'retain'],
        language: 'English'
    },
    {
        word: 'obtain',
        meaning: 'to get or acquire something',
        example: 'Researchers obtained useful results from the experiment.',
        synonyms: ['get', 'acquire', 'gain'],
        language: 'English'
    },
    {
        word: 'perspective',
        meaning: 'a particular way of thinking about or understanding something',
        example: 'The study provides a different perspective on online education.',
        synonyms: ['viewpoint', 'outlook', 'stance'],
        language: 'English'
    },
    {
        word: 'prioritise',
        meaning: 'to decide which things are more important than others',
        example: 'The project manager must prioritise urgent tasks.',
        synonyms: ['rank', 'organise', 'order'],
        language: 'English'
    },
    {
        word: 'relevant',
        meaning: 'directly connected with the subject being discussed',
        example: 'Students should include only relevant information in the report.',
        synonyms: ['related', 'applicable', 'pertinent'],
        language: 'English'
    },
    {
        word: 'significant',
        meaning: 'important or large enough to have an effect',
        example: 'The update produced a significant improvement in performance.',
        synonyms: ['important', 'major', 'considerable'],
        language: 'English'
    },
    {
        word: 'subsequent',
        meaning: 'happening after something else',
        example: 'The subsequent investigation revealed several security issues.',
        synonyms: ['following', 'later', 'ensuing'],
        language: 'English'
    },
    {
        word: 'sustainable',
        meaning: 'able to continue for a long time without causing serious problems',
        example: 'The company needs a sustainable business model.',
        synonyms: ['viable', 'durable', 'long-lasting'],
        language: 'English'
    },
    {
        word: 'utilise',
        meaning: 'to use something effectively',
        example: 'The application utilises machine learning to analyse data.',
        synonyms: ['use', 'employ', 'apply'],
        language: 'English'
    },

    // =========================
    // ENGLISH — TECH / CS
    // =========================

    {
        word: 'algorithm',
        meaning: 'a set of instructions used to solve a problem or perform a task',
        example: 'The algorithm sorts thousands of records in seconds.',
        synonyms: ['procedure', 'method', 'process'],
        language: 'English'
    },
    {
        word: 'authentication',
        meaning: 'the process of verifying the identity of a user',
        example: 'The website uses two-factor authentication.',
        synonyms: ['verification', 'validation', 'identification'],
        language: 'English'
    },
    {
        word: 'database',
        meaning: 'an organised collection of data stored electronically',
        example: 'The application stores user information in a database.',
        synonyms: ['data store', 'repository', 'data bank'],
        language: 'English'
    },
    {
        word: 'debug',
        meaning: 'to find and fix problems in computer code',
        example: 'The developer spent several hours debugging the application.',
        synonyms: ['troubleshoot', 'repair', 'fix'],
        language: 'English'
    },
    {
        word: 'deploy',
        meaning: 'to make a software system available for users',
        example: 'The team will deploy the application next week.',
        synonyms: ['release', 'launch', 'publish'],
        language: 'English'
    },
    {
        word: 'framework',
        meaning: 'a structure or collection of tools used to develop software',
        example: 'Vue is a popular framework for building web interfaces.',
        synonyms: ['platform', 'structure', 'system'],
        language: 'English'
    },
    {
        word: 'interface',
        meaning: 'the part of a system through which users interact with it',
        example: 'The application has a simple and intuitive interface.',
        synonyms: ['UI', 'connection', 'interaction'],
        language: 'English'
    },
    {
        word: 'middleware',
        meaning: 'software that connects different applications or components',
        example: 'The API uses middleware to handle authentication.',
        synonyms: ['software layer', 'connector', 'intermediary'],
        language: 'English'
    },
    {
        word: 'repository',
        meaning: 'a storage location for code or other digital resources',
        example: 'The project is stored in a Git repository.',
        synonyms: ['storage', 'archive', 'collection'],
        language: 'English'
    },
    {
        word: 'validation',
        meaning: 'the process of checking whether something meets requirements',
        example: 'Form validation prevents users from submitting invalid data.',
        synonyms: ['verification', 'checking', 'confirmation'],
        language: 'English'
    },

    // =========================
    // VIETNAMESE
    // =========================

    {
        word: 'học tập',
        meaning: 'quá trình tiếp thu kiến thức hoặc kỹ năng',
        example: 'Học tập đều đặn giúp sinh viên tiến bộ nhanh hơn.',
        synonyms: ['học hành', 'nghiên cứu', 'đào tạo'],
        language: 'Vietnamese'
    },
    {
        word: 'kiến thức',
        meaning: 'những thông tin và hiểu biết mà một người có được',
        example: 'Kiến thức về lập trình rất quan trọng đối với sinh viên CNTT.',
        synonyms: ['hiểu biết', 'tri thức', 'thông tin'],
        language: 'Vietnamese'
    },
    {
        word: 'kỹ năng',
        meaning: 'khả năng thực hiện một công việc hoặc hoạt động',
        example: 'Kỹ năng giao tiếp rất cần thiết trong môi trường làm việc.',
        synonyms: ['năng lực', 'khả năng', 'tay nghề'],
        language: 'Vietnamese'
    },
    {
        word: 'mục tiêu',
        meaning: 'điều mà một người hoặc tổ chức muốn đạt được',
        example: 'Mục tiêu của dự án là xây dựng một hệ thống học từ vựng.',
        synonyms: ['đích', 'định hướng', 'tham vọng'],
        language: 'Vietnamese'
    },
    {
        word: 'phát triển',
        meaning: 'làm cho một thứ trở nên tốt hơn hoặc lớn mạnh hơn',
        example: 'Nhóm đang phát triển một ứng dụng học tiếng Anh.',
        synonyms: ['tiến bộ', 'mở rộng', 'tăng trưởng'],
        language: 'Vietnamese'
    },
    {
        word: 'hiệu quả',
        meaning: 'có khả năng tạo ra kết quả tốt',
        example: 'Phương pháp này giúp sinh viên học từ vựng hiệu quả hơn.',
        synonyms: ['hiệu suất', 'tác dụng', 'năng suất'],
        language: 'Vietnamese'
    },
    {
        word: 'thách thức',
        meaning: 'điều khó khăn đòi hỏi sự nỗ lực để giải quyết',
        example: 'Quản lý thời gian là một thách thức đối với nhiều sinh viên.',
        synonyms: ['khó khăn', 'trở ngại', 'thử thách'],
        language: 'Vietnamese'
    },
    {
        word: 'giải pháp',
        meaning: 'cách thức được sử dụng để giải quyết một vấn đề',
        example: 'Nhóm đã đưa ra một giải pháp đơn giản cho vấn đề này.',
        synonyms: ['cách giải quyết', 'phương án', 'biện pháp'],
        language: 'Vietnamese'
    },

    // =========================
    // FRENCH
    // =========================

    {
        word: 'bonjour',
        meaning: 'a common French greeting meaning hello or good day',
        example: 'Bonjour, comment allez-vous aujourd’hui?',
        synonyms: ['salut', 'coucou'],
        language: 'French'
    },
    {
        word: 'merci',
        meaning: 'a French word used to express thanks',
        example: 'Merci pour votre aide.',
        synonyms: ['remerciement', 'gratitude'],
        language: 'French'
    },
    {
        word: 'important',
        meaning: 'having great value or significance',
        example: 'Il est important de pratiquer chaque jour.',
        synonyms: ['essentiel', 'significatif', 'capital'],
        language: 'French'
    },
    {
        word: 'rapide',
        meaning: 'moving or happening at high speed',
        example: 'Le système est rapide et efficace.',
        synonyms: ['vite', 'prompt', 'vif'],
        language: 'French'
    },
    {
        word: 'difficile',
        meaning: 'not easy to do, understand, or achieve',
        example: 'Cette question est difficile.',
        synonyms: ['complexe', 'dur', 'compliqué'],
        language: 'French'
    },
    {
        word: 'facile',
        meaning: 'not difficult to do or understand',
        example: 'Cette application est facile à utiliser.',
        synonyms: ['simple', 'aisé', 'accessible'],
        language: 'French'
    },
    {
        word: 'apprendre',
        meaning: 'to gain knowledge or a skill through study or experience',
        example: 'Je veux apprendre le français.',
        synonyms: ['étudier', 'assimiler', 'découvrir'],
        language: 'French'
    },
    {
        word: 'comprendre',
        meaning: 'to understand something',
        example: 'Je veux comprendre cette leçon.',
        synonyms: ['saisir', 'assimiler', 'concevoir'],
        language: 'French'
    }
]

async function seedWords() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('🟢 MongoDB connected.')

        // WARNING:
        // This removes ALL existing Word documents.
        await Word.deleteMany({})

        console.log('🗑️ Existing words deleted.')

        const insertedWords = await Word.insertMany(words)

        console.log(`🔥 Seed completed: ${insertedWords.length} words inserted.`)

        console.log(
            `📚 English: ${insertedWords.filter(w => w.language === 'English').length}`
        )

        console.log(
            `🇻🇳 Vietnamese: ${insertedWords.filter(w => w.language === 'Vietnamese').length}`
        )

        console.log(
            `🇫🇷 French: ${insertedWords.filter(w => w.language === 'French').length}`
        )

        process.exit(0)
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }
}

seedWords()