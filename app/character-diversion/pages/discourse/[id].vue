<template>
  <div class="flex flex-col h-screen overflow-hidden" v-if="$state.discourse.current">
  <div class="mr-2 mt-2">
    <Card tag="nav" class="w-full flex justify-center gap-1 bg-beige-50">
      <Button :icon="'address-card'" :title="'About'" color="" class="flex-1 lg clear flex-row-reverse"
        >About</Button
      >
      <Button :icon="'border-all'" :title="'Glyphs'" color="" class="flex-1 lg clear flex-row-reverse"
        >Glyphs</Button
      >
      <Button :icon="'diagram-successor'" :title="'Opinions'" color="" class="flex-1 lg clear flex-row-reverse"
        >Opinions</Button
      >
    </Card>
    </div>
    <div class="flex grow overflow-auto flex-row-reverse gap-2 mr-2">
      <div class="grow overflow-auto">
        <div class="flex item-center my-5 justify-between">
          <div class="button-group">
            <Button
              v-for="(glyphsViewObject, name) in glyphsViews"
              @click="setView(name)"
              :class="{ active: glyphsView === name }"
              :icon="glyphsViewObject.icon"
              :title="glyphsViewObject.label"
              v-show="!glyphsViewObject.hide"
            />
          </div>
          <Button
            @click="$state.discourse.filter.opinion = !$state.discourse.filter.opinion"
            icon="filter"
            class="ml-auto mr-2 clear"
            :title="$t('filter')"
            :class="{ active: $state.discourse.filter.opinion }"
          />
        </div>
        <Input
          type="text"
          v-model="$state.discourse.search"
          placeholder="Filter glyphs ..."
          containerClass="text-bold w-auto w-full"
          class="lg"
        />
        <div :class="`flex flex-wrap mt-2 gap-5`">
          <!-- grid-cols-[25px_minmax(300px,_1fr)] -->
          <div
            class="py-2 flex-1 max-w-full items-center grid"
            v-if="$state.discourse.font"
            v-for="axis in $state.discourse.font.axes"
            :key="axis.tag"
          >
            <!-- <Input type="checkbox" class="" v-model="$state.opinion.form.attributes.activeAxes" :value="axis.tag" /> -->
            <Input
              v-if="
                $state.opinion.form.attributes.axes &&
                axis.tag in $state.opinion.form.attributes.axes &&
                glyphsView === 'intersect'
              "
              type="range"
              :step="1"
              :min="axis.min"
              :max="axis.max"
              v-model="$state.opinion.form.attributes.axes[axis.tag]"
              :label="axis.name"
              color="info"
              :inlineRange="true"
              containerClass="grid grid-cols-[80px_minmax(200px,_1fr)]"
            />
            <Input
              v-if="
                $state.opinion.form.attributes.axes &&
                axis.tag in $state.opinion.form.attributes.axes &&
                glyphsView !== 'intersect'
              "
              type="range"
              :step="1"
              :min="axis.min"
              :max="axis.max"
              v-model="$state.opinion.form.attributes.axes[axis.tag][0]"
              :label="axis.name"
              color="info"
              :inlineRange="true"
              containerClass="grid grid-cols-[80px_minmax(200px,_1fr)]"
            />
            <!-- :disabled="!$state.opinion.form.attributes.activeAxes.includes(axis.tag)" -->
          </div>
        </div>
        <GlyphsSelection
          :gridSize="glyphsViews[glyphsView].gridSize"
          :fontSize="glyphsViews[glyphsView].fontSize"
          :edit="glyphsViews[glyphsView].edit && $state.opinion.formActive"
          :annotations="glyphsViews[glyphsView].annotations"
          :intersection="glyphsViews[glyphsView].intersection"
          :frame="glyphsViews[glyphsView].frame"
          :outline="glyphsViews[glyphsView].outline"
          :style="style"
        />
      </div>

      <DiscourseSidebar />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      glyphsView: "detail",
    };
  },
  computed: {
    glyphsViews(): { [key: string]: { [key: string]: any } } {
      return {
        overview: {
          label: "Overview",
          icon: "border-all",
          gridSize: "12",
          fontSize: "2xl",
        },
        detail: {
          label: "Detail",
          icon: "eye",
          gridSize: "64",
          fontSize: "10xl",
          edit: true,
          annotations: true,
          frame: true,
        },
        intersect: {
          label: "Intersection",
          icon: "diagram-venn",
          gridSize: "80",
          fontSize: "16xl",
          edit: true,
          annotations: true,
          intersection: true,
          frame: true,
          hide: !this.$state.discourse.font?.glyphs.some((e) => e.tvts.length > 0),
        },
        path: {
          label: "Path",
          icon: "bezier-curve",
          gridSize: "80",
          fontSize: "16xl",
          edit: true,
          annotations: true,
          frame: true,
          outline: true,
        },
      };
    },
    style() {
      const axesRaw = this.$state.opinion.form.attributes.axes;
      const axes = Object.entries(axesRaw)
        .map((axis) => {
          return `'${axis[0]}' ${axis[1][0]}`;
        })
        .join(", ");
      return `--font-variation-settings: ${axes}`;
    },
  },
  methods: {
    setView(name: string) {
      this.glyphsView = name;
    },
  },
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: var(--border-default);

  .button {
    --border-radius: 0;

    &:first-child {
      --border-radius: var(--rounded-md) 0 0 var(--rounded-md);
    }

    &:last-child {
      --border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
    }
  }
}
</style>
