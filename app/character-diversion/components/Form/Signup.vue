<template>
  <form class="flex flex-col gap-2" @submit.prevent="signUp">
    <Input type="text" name="name" placeholder="Name" v-model="formData.name" class="lg" />
    <Input type="email" name="email" placeholder="Email" v-model="formData.email" class="lg" />
    <Input type="password" name="password" placeholder="Password" v-model="formData.password" class="lg" />
    <Button type="submit" class="lg">Sign up</Button>
    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
    <hr />
    <p>{{$t('have.account')}} <Button to="/login" class="clear inline">{{$t('login')}}</Button></p>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formData: {} as { name: string; email: string; password: string; username: string },
      error: false,
      errorMsg: `An error occurred, please try again`,
    }
  },
  computed: {
    name() {
      return this.formData.name
    }
  },
	watch: {
		name(value: string) {
			this.formData.username = this.slugify(value)
		}
	},
  methods: {
    async signUp(e: Event) {
      try {
        this.$strapi.register(this.formData)
          .then((res) => {
            this.formData = {}
            this.$router.push('/')
          })
          .catch(({error}) => {
            this.errorMsg = error.message
            this.error = true
          })
      } catch (e) {
        console.error(e)
      }
    },
		slugify(string: string) {
			if (string == null) return string
			return string
				.toString()
				.normalize('NFKD')
				.toLowerCase()
				.trim()
				.replace(/\s+/g, '-')
				.replace(/[^\w\-]+/g, '')
				.replace(/\-\-+/g, '-')
		}
  },
}
</script>


<style>
</style>