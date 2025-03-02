<template>
  <div class="flex flex-col overflow-auto h-full w-full">
    <Header class="border-0" iconClass="text-black">Character Diversion</Header>
    <main class="p-10 pb-40 text-black grow">
      <div class="max-w-4xl mx-auto">
        <!-- <Input v-model="headine" class="text-black" />
				<Input v-model="letter" class="text-black" /> -->
        <LandingHeadline :headline="headine" :letter="letter" class="mt-12 mb-12" />
        <div
          class="max-w-xl mx-auto mb-48 flex gap-5 flex-col sm:flex-row items-start sm:items-center"
        >
          <div>
            Designers and foundries explore, discuss, and work on their typefaces on
            Character Diversion—the most adequate platform for typographic discourse in
            the world.
          </div>
          <div>
            <Button
              to="/discourse"
              icon="arrow-right"
              style="--background-color: var(--color-yellow-500)"
              >Discover</Button
            >
          </div>
        </div>
        <LandingSection class="stack">
          <template #image>
            <div class="relative">
              <div
                v-for="(discourseItem, i) in discourses"
                :key="discourseItem.id"
                class="d"
                :style="`--i: ${i}; --length: ${discourses.length}`"
              >
                <DiscourseCard :discourse="discourseItem" />
              </div>
            </div>
          </template>
          <template #title>Discover</template>
          <template #description
            >Explore discourses type and discover a new way to delve into the world of
            typography, one character at a time. them!</template
          >
        </LandingSection>
        <LandingSection>
          <template #image><img src="/images/sushi.png" /></template>
          <template #title>Discuss</template>
          <template #description
            >On Character Diversion we're crowdsourcing opinions on new fonts and
            character shapes. We want to hear what you think!</template
          >
        </LandingSection>
        <LandingSection>
          <template #image><img src="/images/sushi.png" /></template>
          <template #title>Diverge</template>
          <template #description
            >New discourses on type are uploaded on a daily basis, discover
            them!</template
          >
        </LandingSection>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Discourse } from "~/types";
export default {
  data() {
    return {
      headine: "Everyone has an ospinsion on type. It's time to share it.",
      letter: "S",
    };
  },
  mounted() {
    this.$state.discourse.fetch();
  },
  computed: {
    discourses(): Discourse[] {
      const n = 3;
      const d = Object.values<Discourse>(this.$state.discourse.all).sort(
        (a: Discourse, b: Discourse) => {
          return (
            Number(new Date(a.attributes.publishedAt)) -
            Number(new Date(b.attributes.publishedAt))
          );
        }
      );
      return d.slice(-n);
    },
  },
};
</script>

<style lang="scss" scoped>
.stack {
  &:hover .d {
    --rx: 20deg;
    --ry: -40deg;
  }
}

.d {
  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  --f: calc(1 / var(--length));
  --g: calc(200 / var(--length) * 1px);
  --o: calc(var(--i) * var(--f) + var(--f));
  --tz: calc(var(--g) * -1 * var(--i) + var(--g));
  --ty: 0;
  --rx: 10deg;
  --ry: -15deg;
  border-radius: var(--rounded-md);
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(var(--tz))
    translateY(var(--ty));
  background-color: var(--color-beige-200);
  transition: var(--transition-duration-300) var(--transition-timing-function-default);

  & > * {
    opacity: var(--o);
  }

  &:hover {
    --ty: -50px;
  }
}
</style>
