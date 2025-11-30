<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; 

const route = useRoute();
const category = route.params.category;
const authStore = useAuthStore();

const habitName = ref('');
const start = ref('');
const end = ref('');
const error = ref("");
const success = ref("");

const createHabit = async () => {
    if(!auth.user){
        error.value = "Precisa fazer login.";
        router.push('/login');
    }
}
</script>