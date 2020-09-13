new Vue({
    el: '#app',
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: [],

        multiple_attack: 10,
        multiple_special_attack: 20,
        multiple_heal_up: 15,
        multiple_monster_attack: 15,
        log_text: {
            attack: 'Oyuncu Atagi: ',
            special_attack: 'Ozel Oyuncu Atagi: ',
            monster_attac: 'Canavar Atagi: ',
            heal_up: 'Ilk Yardim: ',
            give_up: 'Oyuncu Cekildi..',
        }
    },
    methods: {
        start_game: function(){
            this.game_is_on = true
        },
        attack: function(){
            var point = Math.ceil(Math.random() * multiple_attack)
            this.monster_heal -= point

            this.add_to_log({turn: 'p', text: this.log_text.attack + point})
            this.monster_attac()
        },
        special_attac: function(){
            var point = Math.ceil(Math.random() * multiple_special_attack)
            this.monster_heal -= point

            this.add_to_log({turn: 'p', text: this.log_text.special_attac + point})
            this.monster_attac()
        },
        heal_up: function(){
            var point = Math.ceil(Math.random() * multiple_heal_up)
            this.player_heal += point

            this.add_to_log({turn: 'p', text: this.log_text.heal_up + point})
            this.monster_attac()
        },
        give_up: function(){
            this.player_heal = 0
            this.add_to_log({turn: 'p', text: this.log_text.give_up})
        },
        monster_attac: function(){
            var point = Math.ceil(Math.random() * multiple_monster_attack)
            this.player_heal -= point

            this.add_to_log({turn: 'm', text: this.log_text.monster_attac + point})
        },
        add_to_log: function(log){
            this.logs.push(log)
        }
    },
    watch: {
        player_heal: function(value){
            if(value <= 0){
                this.player_heal = 0
                if(confirm('Malesef Kaybettin.. \nTekrar Dene..')){
                    this.player_heal = 100
                    this.monster_heal = 100
                    this.logs = []
                }
            }else if(value >= 100){
                this.player_heal = 100
            }
        },
        monster_heal: function(value){  
            if(value <= 0){
                this.monster_heal = 0
                if(confirm('Tebrikler Kazandin.. \nTekrar Dene..')){
                    this.player_heal = 100
                    this.monster_heal = 100
                    this.logs = []
                }
            }else if(value >= 100){
                this.monster_heal = 100
            }
        }
    },
    computed: {
        user_progress: function(){
            return {
                width: this.player_heal + '%'
            }
        },
        monster_progress: function(){
            return {
                width: this.monster_heal + '%'
            }
        }
    }
})