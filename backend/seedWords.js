import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Word from './models/wordModel.js'
import dns from 'dns'

dns.setServers(['8.8.8.8'])
dotenv.config()

const words = [
    // =========================================================
    // ENGLISH — 30 WORDS
    // =========================================================

    {
        word: 'abandon',
        pronunciation: '/əˈbændən/',
        meaning: 'to leave someone or something completely',
        example: 'The family had to abandon their house after the flood.',
        synonyms: ['leave', 'desert', 'forsake'],
        language: 'English'
    },
    {
        word: 'achieve',
        pronunciation: '/əˈtʃiːv/',
        meaning: 'to successfully reach a goal or result',
        example: 'She worked hard to achieve her academic goals.',
        synonyms: ['accomplish', 'attain', 'reach'],
        language: 'English'
    },
    {
        word: 'adapt',
        pronunciation: '/əˈdæpt/',
        meaning: 'to change something to suit a new situation',
        example: 'Students must adapt to different learning environments.',
        synonyms: ['adjust', 'modify', 'alter'],
        language: 'English'
    },
    {
        word: 'accurate',
        pronunciation: '/ˈækjərət/',
        meaning: 'correct and without mistakes',
        example: 'The report provides accurate information about the project.',
        synonyms: ['correct', 'precise', 'exact'],
        language: 'English'
    },
    {
        word: 'ambitious',
        pronunciation: '/æmˈbɪʃəs/',
        meaning: 'having a strong desire to achieve something important',
        example: 'He has an ambitious plan to build his own company.',
        synonyms: ['aspiring', 'determined', 'driven'],
        language: 'English'
    },
    {
        word: 'analyse',
        pronunciation: '/ˈænəlaɪz/',
        meaning: 'to examine something carefully in order to understand it',
        example: 'We need to analyse the survey results before making a decision.',
        synonyms: ['examine', 'evaluate', 'assess'],
        language: 'English'
    },
    {
        word: 'anxious',
        pronunciation: '/ˈæŋkʃəs/',
        meaning: 'worried or nervous about something',
        example: 'She felt anxious before the final examination.',
        synonyms: ['worried', 'nervous', 'uneasy'],
        language: 'English'
    },
    {
        word: 'approach',
        pronunciation: '/əˈprəʊtʃ/',
        meaning: 'a way of dealing with a situation or problem',
        example: 'The team adopted a new approach to software development.',
        synonyms: ['method', 'strategy', 'technique'],
        language: 'English'
    },
    {
        word: 'beneficial',
        pronunciation: '/ˌbenɪˈfɪʃəl/',
        meaning: 'having a useful or positive effect',
        example: 'Regular exercise is beneficial to physical health.',
        synonyms: ['helpful', 'useful', 'advantageous'],
        language: 'English'
    },
    {
        word: 'coherent',
        pronunciation: '/kəʊˈhɪərənt/',
        meaning: 'logical, clear, and well organised',
        example: 'The student presented a coherent argument.',
        synonyms: ['logical', 'consistent', 'organised'],
        language: 'English'
    },
    {
        word: 'complex',
        pronunciation: '/ˈkɒmpleks/',
        meaning: 'consisting of many different and connected parts',
        example: 'The software system has a complex architecture.',
        synonyms: ['complicated', 'intricate', 'sophisticated'],
        language: 'English'
    },
    {
        word: 'consistent',
        pronunciation: '/kənˈsɪstənt/',
        meaning: 'always behaving or happening in a similar way',
        example: 'The application provides consistent results.',
        synonyms: ['constant', 'reliable', 'uniform'],
        language: 'English'
    },
    {
        word: 'crucial',
        pronunciation: '/ˈkruːʃəl/',
        meaning: 'extremely important for achieving a result',
        example: 'Testing is crucial before releasing the application.',
        synonyms: ['essential', 'critical', 'vital'],
        language: 'English'
    },
    {
        word: 'demonstrate',
        pronunciation: '/ˈdemənstreɪt/',
        meaning: 'to show clearly that something is true or works',
        example: 'The experiment demonstrates the effectiveness of the method.',
        synonyms: ['show', 'display', 'illustrate'],
        language: 'English'
    },
    {
        word: 'diverse',
        pronunciation: '/daɪˈvɜːs/',
        meaning: 'including many different types or groups',
        example: 'The university has a diverse student population.',
        synonyms: ['varied', 'different', 'wide-ranging'],
        language: 'English'
    },
    {
        word: 'efficient',
        pronunciation: '/ɪˈfɪʃənt/',
        meaning: 'working well without wasting time, energy, or resources',
        example: 'The new algorithm is more efficient than the previous version.',
        synonyms: ['effective', 'productive', 'economical'],
        language: 'English'
    },
    {
        word: 'enhance',
        pronunciation: '/ɪnˈhɑːns/',
        meaning: 'to improve the quality or value of something',
        example: 'The update enhances the performance of the application.',
        synonyms: ['improve', 'strengthen', 'upgrade'],
        language: 'English'
    },
    {
        word: 'evaluate',
        pronunciation: '/ɪˈvæljueɪt/',
        meaning: 'to judge the quality, importance, or effectiveness of something',
        example: 'The teacher will evaluate the students performance.',
        synonyms: ['assess', 'judge', 'examine'],
        language: 'English'
    },
    {
        word: 'facilitate',
        pronunciation: '/fəˈsɪlɪteɪt/',
        meaning: 'to make an activity or process easier',
        example: 'The platform facilitates communication between students and teachers.',
        synonyms: ['assist', 'enable', 'ease'],
        language: 'English'
    },
    {
        word: 'fundamental',
        pronunciation: '/ˌfʌndəˈmentəl/',
        meaning: 'basic and essential to a system or idea',
        example: 'Understanding algorithms is fundamental to computer science.',
        synonyms: ['basic', 'essential', 'core'],
        language: 'English'
    },
    {
        word: 'implement',
        pronunciation: '/ˈɪmplɪment/',
        meaning: 'to put a plan, idea, or system into operation',
        example: 'The developers implemented a new authentication system.',
        synonyms: ['execute', 'apply', 'introduce'],
        language: 'English'
    },
    {
        word: 'innovative',
        pronunciation: '/ˈɪnəveɪtɪv/',
        meaning: 'using new ideas or methods',
        example: 'The startup developed an innovative learning platform.',
        synonyms: ['creative', 'original', 'inventive'],
        language: 'English'
    },
    {
        word: 'integrate',
        pronunciation: '/ˈɪntɪɡreɪt/',
        meaning: 'to combine different things into one system',
        example: 'The application integrates several external services.',
        synonyms: ['combine', 'merge', 'unify'],
        language: 'English'
    },
    {
        word: 'maintain',
        pronunciation: '/meɪnˈteɪn/',
        meaning: 'to keep something in good condition or at the same level',
        example: 'Developers must maintain the system after deployment.',
        synonyms: ['preserve', 'sustain', 'retain'],
        language: 'English'
    },
    {
        word: 'perspective',
        pronunciation: '/pəˈspektɪv/',
        meaning: 'a particular way of thinking about or understanding something',
        example: 'The study provides a different perspective on online education.',
        synonyms: ['viewpoint', 'outlook', 'stance'],
        language: 'English'
    },
    {
        word: 'prioritise',
        pronunciation: '/praɪˈɒrətaɪz/',
        meaning: 'to decide which things are more important than others',
        example: 'The project manager must prioritise urgent tasks.',
        synonyms: ['rank', 'organise', 'order'],
        language: 'English'
    },
    {
        word: 'relevant',
        pronunciation: '/ˈreləvənt/',
        meaning: 'directly connected with the subject being discussed',
        example: 'Students should include only relevant information in the report.',
        synonyms: ['related', 'applicable', 'pertinent'],
        language: 'English'
    },
    {
        word: 'significant',
        pronunciation: '/sɪɡˈnɪfɪkənt/',
        meaning: 'important or large enough to have an effect',
        example: 'The update produced a significant improvement in performance.',
        synonyms: ['important', 'major', 'considerable'],
        language: 'English'
    },
    {
        word: 'sustainable',
        pronunciation: '/səˈsteɪnəbəl/',
        meaning: 'able to continue for a long time without causing serious problems',
        example: 'The company needs a sustainable business model.',
        synonyms: ['viable', 'durable', 'long-lasting'],
        language: 'English'
    },
    {
        word: 'validation',
        pronunciation: '/ˌvælɪˈdeɪʃən/',
        meaning: 'the process of checking whether something meets requirements',
        example: 'Form validation prevents users from submitting invalid data.',
        synonyms: ['verification', 'checking', 'confirmation'],
        language: 'English'
    },

    // =========================================================
    // VIETNAMESE — 30 WORDS
    // =========================================================

    {
        word: 'học tập',
        pronunciation: 'học tập',
        meaning: 'quá trình tiếp thu kiến thức hoặc kỹ năng',
        example: 'Học tập đều đặn giúp sinh viên tiến bộ nhanh hơn.',
        synonyms: ['học hành', 'nghiên cứu', 'đào tạo'],
        language: 'Vietnamese'
    },
    {
        word: 'kiến thức',
        pronunciation: 'kiến thức',
        meaning: 'những thông tin và hiểu biết mà một người có được',
        example: 'Kiến thức về lập trình rất quan trọng đối với sinh viên CNTT.',
        synonyms: ['hiểu biết', 'tri thức', 'thông tin'],
        language: 'Vietnamese'
    },
    {
        word: 'kỹ năng',
        pronunciation: 'kỹ năng',
        meaning: 'khả năng thực hiện một công việc hoặc hoạt động',
        example: 'Kỹ năng giao tiếp rất cần thiết trong môi trường làm việc.',
        synonyms: ['năng lực', 'khả năng', 'tay nghề'],
        language: 'Vietnamese'
    },
    {
        word: 'mục tiêu',
        pronunciation: 'mục tiêu',
        meaning: 'điều mà một người hoặc tổ chức muốn đạt được',
        example: 'Mục tiêu của dự án là xây dựng một hệ thống học từ vựng.',
        synonyms: ['đích', 'định hướng', 'tham vọng'],
        language: 'Vietnamese'
    },
    {
        word: 'phát triển',
        pronunciation: 'phát triển',
        meaning: 'làm cho một thứ trở nên tốt hơn hoặc lớn mạnh hơn',
        example: 'Nhóm đang phát triển một ứng dụng học tiếng Anh.',
        synonyms: ['tiến bộ', 'mở rộng', 'tăng trưởng'],
        language: 'Vietnamese'
    },
    {
        word: 'hiệu quả',
        pronunciation: 'hiệu quả',
        meaning: 'có khả năng tạo ra kết quả tốt',
        example: 'Phương pháp này giúp sinh viên học từ vựng hiệu quả hơn.',
        synonyms: ['hiệu suất', 'tác dụng', 'năng suất'],
        language: 'Vietnamese'
    },
    {
        word: 'thách thức',
        pronunciation: 'thách thức',
        meaning: 'điều khó khăn đòi hỏi sự nỗ lực để giải quyết',
        example: 'Quản lý thời gian là một thách thức đối với nhiều sinh viên.',
        synonyms: ['khó khăn', 'trở ngại', 'thử thách'],
        language: 'Vietnamese'
    },
    {
        word: 'giải pháp',
        pronunciation: 'giải pháp',
        meaning: 'cách thức được sử dụng để giải quyết một vấn đề',
        example: 'Nhóm đã đưa ra một giải pháp đơn giản cho vấn đề này.',
        synonyms: ['cách giải quyết', 'phương án', 'biện pháp'],
        language: 'Vietnamese'
    },
    {
        word: 'công nghệ',
        pronunciation: 'công nghệ',
        meaning: 'tập hợp kiến thức và phương pháp được sử dụng để tạo ra sản phẩm hoặc giải quyết vấn đề',
        example: 'Công nghệ đang thay đổi cách con người học tập và làm việc.',
        synonyms: ['kỹ thuật', 'khoa học ứng dụng', 'công nghệ kỹ thuật'],
        language: 'Vietnamese'
    },
    {
        word: 'dữ liệu',
        pronunciation: 'dữ liệu',
        meaning: 'thông tin được thu thập và lưu trữ để sử dụng hoặc phân tích',
        example: 'Hệ thống lưu trữ dữ liệu của người dùng trong cơ sở dữ liệu.',
        synonyms: ['thông tin', 'số liệu', 'tư liệu'],
        language: 'Vietnamese'
    },
    {
        word: 'hệ thống',
        pronunciation: 'hệ thống',
        meaning: 'tập hợp các thành phần liên kết và hoạt động cùng nhau',
        example: 'Hệ thống quản lý từ vựng được xây dựng bằng Node.js.',
        synonyms: ['cơ chế', 'mạng lưới', 'cấu trúc'],
        language: 'Vietnamese'
    },
    {
        word: 'ứng dụng',
        pronunciation: 'ứng dụng',
        meaning: 'phần mềm được thiết kế để thực hiện một hoặc nhiều nhiệm vụ',
        example: 'Ứng dụng giúp người dùng học từ vựng mỗi ngày.',
        synonyms: ['phần mềm', 'chương trình', 'công cụ'],
        language: 'Vietnamese'
    },
    {
        word: 'bảo mật',
        pronunciation: 'bảo mật',
        meaning: 'việc bảo vệ thông tin và hệ thống khỏi truy cập hoặc sử dụng trái phép',
        example: 'Bảo mật dữ liệu người dùng là một yêu cầu quan trọng.',
        synonyms: ['an toàn', 'bảo vệ', 'an ninh'],
        language: 'Vietnamese'
    },
    {
        word: 'xác thực',
        pronunciation: 'xác thực',
        meaning: 'quá trình kiểm tra danh tính của người dùng hoặc hệ thống',
        example: 'Người dùng phải xác thực trước khi truy cập tài khoản.',
        synonyms: ['kiểm chứng', 'xác minh', 'chứng thực'],
        language: 'Vietnamese'
    },
    {
        word: 'kiểm tra',
        pronunciation: 'kiểm tra',
        meaning: 'xem xét hoặc đánh giá để phát hiện lỗi hoặc xác định chất lượng',
        example: 'Nhóm cần kiểm tra hệ thống trước khi triển khai.',
        synonyms: ['kiểm nghiệm', 'đánh giá', 'xem xét'],
        language: 'Vietnamese'
    },
    {
        word: 'đánh giá',
        pronunciation: 'đánh giá',
        meaning: 'xem xét và đưa ra nhận định về chất lượng hoặc giá trị',
        example: 'Giảng viên sẽ đánh giá bài làm dựa trên tiêu chí của môn học.',
        synonyms: ['thẩm định', 'nhận xét', 'xem xét'],
        language: 'Vietnamese'
    },
    {
        word: 'nghiên cứu',
        pronunciation: 'nghiên cứu',
        meaning: 'quá trình tìm hiểu một vấn đề một cách có hệ thống',
        example: 'Sinh viên đang nghiên cứu các phương pháp học từ vựng.',
        synonyms: ['khảo sát', 'tìm hiểu', 'phân tích'],
        language: 'Vietnamese'
    },
    {
        word: 'phân tích',
        pronunciation: 'phân tích',
        meaning: 'xem xét các thành phần của một vấn đề để hiểu rõ bản chất',
        example: 'Nhóm phân tích dữ liệu trước khi đưa ra kết luận.',
        synonyms: ['mổ xẻ', 'xem xét', 'đánh giá'],
        language: 'Vietnamese'
    },
    {
        word: 'cải thiện',
        pronunciation: 'cải thiện',
        meaning: 'làm cho một thứ trở nên tốt hơn',
        example: 'Bản cập nhật giúp cải thiện hiệu suất của ứng dụng.',
        synonyms: ['nâng cao', 'tăng cường', 'hoàn thiện'],
        language: 'Vietnamese'
    },
    {
        word: 'môi trường',
        pronunciation: 'môi trường',
        meaning: 'điều kiện và không gian xung quanh một người hoặc một hệ thống',
        example: 'Sinh viên cần một môi trường học tập phù hợp.',
        synonyms: ['không gian', 'điều kiện', 'bối cảnh'],
        language: 'Vietnamese'
    },
    {
        word: 'kinh nghiệm',
        pronunciation: 'kinh nghiệm',
        meaning: 'kiến thức hoặc kỹ năng có được thông qua thực tế',
        example: 'Kinh nghiệm thực tế giúp sinh viên hiểu rõ hơn về công việc.',
        synonyms: ['trải nghiệm', 'thực tiễn', 'vốn sống'],
        language: 'Vietnamese'
    },
    {
        word: 'sáng tạo',
        pronunciation: 'sáng tạo',
        meaning: 'khả năng tạo ra ý tưởng hoặc sản phẩm mới',
        example: 'Tư duy sáng tạo giúp nhóm tìm ra giải pháp khác biệt.',
        synonyms: ['đổi mới', 'phát minh', 'độc đáo'],
        language: 'Vietnamese'
    },
    {
        word: 'đổi mới',
        pronunciation: 'đổi mới',
        meaning: 'thay đổi để tạo ra phương pháp hoặc kết quả tốt hơn',
        example: 'Doanh nghiệp cần đổi mới để cạnh tranh trên thị trường.',
        synonyms: ['cải tiến', 'cách tân', 'đổi mới sáng tạo'],
        language: 'Vietnamese'
    },
    {
        word: 'chính xác',
        pronunciation: 'chính xác',
        meaning: 'đúng với thực tế hoặc không có sai sót',
        example: 'Hệ thống phải trả về kết quả chính xác.',
        synonyms: ['đúng đắn', 'chuẩn xác', 'đích xác'],
        language: 'Vietnamese'
    },
    {
        word: 'quan trọng',
        pronunciation: 'quan trọng',
        meaning: 'có giá trị hoặc ảnh hưởng lớn',
        example: 'Bảo mật là một phần quan trọng của hệ thống.',
        synonyms: ['cần thiết', 'thiết yếu', 'đáng kể'],
        language: 'Vietnamese'
    },
    {
        word: 'phương pháp',
        pronunciation: 'phương pháp',
        meaning: 'cách thức được sử dụng để thực hiện hoặc giải quyết một việc',
        example: 'Nhóm sử dụng phương pháp Agile để quản lý dự án.',
        synonyms: ['cách thức', 'biện pháp', 'kỹ thuật'],
        language: 'Vietnamese'
    },
    {
        word: 'quy trình',
        pronunciation: 'quy trình',
        meaning: 'chuỗi các bước được thực hiện theo một trình tự nhất định',
        example: 'Hệ thống cần có quy trình xác thực rõ ràng.',
        synonyms: ['trình tự', 'thủ tục', 'tiến trình'],
        language: 'Vietnamese'
    },
    {
        word: 'tài khoản',
        pronunciation: 'tài khoản',
        meaning: 'hồ sơ chứa thông tin cho phép người dùng truy cập một hệ thống',
        example: 'Người dùng có thể cập nhật thông tin tài khoản.',
        synonyms: ['hồ sơ', 'account', 'tài khoản người dùng'],
        language: 'Vietnamese'
    },
    {
        word: 'quản lý',
        pronunciation: 'quản lý',
        meaning: 'tổ chức và kiểm soát người, dữ liệu hoặc hoạt động',
        example: 'Quản trị viên có quyền quản lý toàn bộ dữ liệu từ vựng.',
        synonyms: ['điều hành', 'kiểm soát', 'quản trị'],
        language: 'Vietnamese'
    },
    {
        word: 'thành công',
        pronunciation: 'thành công',
        meaning: 'đạt được kết quả hoặc mục tiêu mong muốn',
        example: 'Dự án đã thành công sau nhiều tuần phát triển.',
        synonyms: ['thắng lợi', 'đạt được', 'hoàn thành'],
        language: 'Vietnamese'
    },

    // =========================================================
    // FRENCH — 30 WORDS
    // =========================================================

    {
        word: 'bonjour',
        pronunciation: '/bɔ̃.ʒuʁ/',
        meaning: 'a common French greeting meaning hello or good day',
        example: 'Bonjour, comment allez-vous aujourd’hui?',
        synonyms: ['salut', 'coucou'],
        language: 'French'
    },
    {
        word: 'merci',
        pronunciation: '/mɛʁ.si/',
        meaning: 'a French word used to express thanks',
        example: 'Merci pour votre aide.',
        synonyms: ['remerciement', 'gratitude'],
        language: 'French'
    },
    {
        word: 'amour',
        pronunciation: '/a.muʁ/',
        meaning: 'a strong feeling of affection or attachment',
        example: 'L’amour est important dans une relation.',
        synonyms: ['affection', 'tendresse', 'passion'],
        language: 'French'
    },
    {
        word: 'ami',
        pronunciation: '/a.mi/',
        meaning: 'a person with whom someone has a close relationship',
        example: 'Mon ami habite près de Paris.',
        synonyms: ['copain', 'camarade', 'compagnon'],
        language: 'French'
    },
    {
        word: 'famille',
        pronunciation: '/fa.mij/',
        meaning: 'a group of people related to each other',
        example: 'Ma famille vit au Vietnam.',
        synonyms: ['parents', 'foyer', 'ménage'],
        language: 'French'
    },
    {
        word: 'maison',
        pronunciation: '/mɛ.zɔ̃/',
        meaning: 'a building where people live',
        example: 'Notre maison est près de l’école.',
        synonyms: ['domicile', 'logement', 'habitation'],
        language: 'French'
    },
    {
        word: 'école',
        pronunciation: '/e.kɔl/',
        meaning: 'a place where students receive education',
        example: 'Les enfants vont à l’école chaque matin.',
        synonyms: ['établissement', 'institution', 'collège'],
        language: 'French'
    },
    {
        word: 'livre',
        pronunciation: '/livʁ/',
        meaning: 'a written work consisting of pages bound together',
        example: 'Je lis un livre intéressant.',
        synonyms: ['ouvrage', 'volume', 'manuel'],
        language: 'French'
    },
    {
        word: 'travail',
        pronunciation: '/tʁa.vaj/',
        meaning: 'activity involving effort performed to achieve a result',
        example: 'Le travail demande beaucoup de concentration.',
        synonyms: ['emploi', 'activité', 'tâche'],
        language: 'French'
    },
    {
        word: 'temps',
        pronunciation: '/tɑ̃/',
        meaning: 'a period during which something happens',
        example: 'Je n’ai pas beaucoup de temps aujourd’hui.',
        synonyms: ['durée', 'moment', 'période'],
        language: 'French'
    },
    {
        word: 'important',
        pronunciation: '/ɛ̃.pɔʁ.tɑ̃/',
        meaning: 'having great value or significance',
        example: 'Il est important de pratiquer chaque jour.',
        synonyms: ['essentiel', 'significatif', 'capital'],
        language: 'French'
    },
    {
        word: 'rapide',
        pronunciation: '/ʁa.pid/',
        meaning: 'moving or happening at high speed',
        example: 'Le système est rapide et efficace.',
        synonyms: ['vite', 'prompt', 'vif'],
        language: 'French'
    },
    {
        word: 'difficile',
        pronunciation: '/di.fi.sil/',
        meaning: 'not easy to do, understand, or achieve',
        example: 'Cette question est difficile.',
        synonyms: ['complexe', 'dur', 'compliqué'],
        language: 'French'
    },
    {
        word: 'facile',
        pronunciation: '/fa.sil/',
        meaning: 'not difficult to do or understand',
        example: 'Cette application est facile à utiliser.',
        synonyms: ['simple', 'aisé', 'accessible'],
        language: 'French'
    },
    {
        word: 'apprendre',
        pronunciation: '/a.pʁɑ̃dʁ/',
        meaning: 'to gain knowledge or a skill through study or experience',
        example: 'Je veux apprendre le français.',
        synonyms: ['étudier', 'assimiler', 'découvrir'],
        language: 'French'
    },
    {
        word: 'comprendre',
        pronunciation: '/kɔ̃.pʁɑ̃dʁ/',
        meaning: 'to understand something',
        example: 'Je veux comprendre cette leçon.',
        synonyms: ['saisir', 'assimiler', 'concevoir'],
        language: 'French'
    },
    {
        word: 'commencer',
        pronunciation: '/kɔ.mɑ̃.se/',
        meaning: 'to begin doing something',
        example: 'Nous allons commencer le cours à neuf heures.',
        synonyms: ['débuter', 'entamer', 'initier'],
        language: 'French'
    },
    {
        word: 'finir',
        pronunciation: '/fi.niʁ/',
        meaning: 'to bring something to an end',
        example: 'Je dois finir mes devoirs ce soir.',
        synonyms: ['terminer', 'achever', 'conclure'],
        language: 'French'
    },
    {
        word: 'parler',
        pronunciation: '/paʁ.le/',
        meaning: 'to communicate using spoken words',
        example: 'Elle aime parler avec ses amis.',
        synonyms: ['discuter', 'communiquer', 's’exprimer'],
        language: 'French'
    },
    {
        word: 'écouter',
        pronunciation: '/e.ku.te/',
        meaning: 'to pay attention to a sound or person speaking',
        example: 'Les étudiants doivent écouter le professeur.',
        synonyms: ['entendre', 'prêter attention', 'ouïr'],
        language: 'French'
    },
    {
        word: 'regarder',
        pronunciation: '/ʁə.ɡaʁ.de/',
        meaning: 'to direct the eyes towards something',
        example: 'Nous allons regarder un film ce soir.',
        synonyms: ['observer', 'contempler', 'voir'],
        language: 'French'
    },
    {
        word: 'manger',
        pronunciation: '/mɑ̃.ʒe/',
        meaning: 'to consume food',
        example: 'Nous allons manger au restaurant.',
        synonyms: ['consommer', 'se nourrir', 'déguster'],
        language: 'French'
    },
    {
        word: 'boire',
        pronunciation: '/bwaʁ/',
        meaning: 'to consume a liquid',
        example: 'Il faut boire suffisamment d’eau.',
        synonyms: ['absorber', 'consommer', 'siroter'],
        language: 'French'
    },
    {
        word: 'voyager',
        pronunciation: '/vwa.ja.ʒe/',
        meaning: 'to travel from one place to another',
        example: 'J’aime voyager pendant les vacances.',
        synonyms: ['partir', 'se déplacer', 'explorer'],
        language: 'French'
    },
    {
        word: 'ville',
        pronunciation: '/vil/',
        meaning: 'a large and permanent human settlement',
        example: 'Paris est une grande ville.',
        synonyms: ['cité', 'agglomération', 'commune'],
        language: 'French'
    },
    {
        word: 'pays',
        pronunciation: '/pei/',
        meaning: 'a nation or territory with its own government',
        example: 'La France est un beau pays.',
        synonyms: ['nation', 'État', 'territoire'],
        language: 'French'
    },
    {
        word: 'problème',
        pronunciation: '/pʁɔ.blɛm/',
        meaning: 'a situation that is difficult to deal with or solve',
        example: 'Nous devons résoudre ce problème rapidement.',
        synonyms: ['difficulté', 'question', 'obstacle'],
        language: 'French'
    },
    {
        word: 'solution',
        pronunciation: '/sɔ.ly.sjɔ̃/',
        meaning: 'a way of solving a problem',
        example: 'Nous avons trouvé une solution simple.',
        synonyms: ['réponse', 'remède', 'résolution'],
        language: 'French'
    },
    {
        word: 'question',
        pronunciation: '/kɛs.tjɔ̃/',
        meaning: 'a sentence used to ask for information',
        example: 'J’ai une question pour le professeur.',
        synonyms: ['demande', 'interrogation', 'requête'],
        language: 'French'
    },
    {
        word: 'réussir',
        pronunciation: '/ʁe.y.siʁ/',
        meaning: 'to successfully achieve something',
        example: 'Elle veut réussir son examen.',
        synonyms: ['accomplir', 'atteindre', 'triompher'],
        language: 'French'
    }
]

async function seedWords() {
    try {
        console.log('🔌 Connecting to MongoDB...')

        await mongoose.connect(process.env.MONGODB_URI)

        console.log('🟢 MongoDB connected.')

        // WARNING:
        // This removes ALL existing Word documents.
        await Word.deleteMany({})

        console.log('🗑️ Existing words deleted.')

        const insertedWords = await Word.insertMany(words)

        const englishCount = insertedWords.filter(
            word => word.language === 'English'
        ).length

        const vietnameseCount = insertedWords.filter(
            word => word.language === 'Vietnamese'
        ).length

        const frenchCount = insertedWords.filter(
            word => word.language === 'French'
        ).length

        console.log(`🔥 Seed completed: ${insertedWords.length} words inserted.`)
        console.log(`📚 English: ${englishCount}`)
        console.log(`🇻🇳 Vietnamese: ${vietnameseCount}`)
        console.log(`🇫🇷 French: ${frenchCount}`)

        await mongoose.disconnect()

        console.log('🔌 MongoDB disconnected.')
        console.log('✅ SEED COMPLETED SUCCESSFULLY.')
    } catch (error) {
        console.error('❌ Seed failed:', error)

        try {
            await mongoose.disconnect()
        } catch {}

        process.exit(1)
    }
}

seedWords()
