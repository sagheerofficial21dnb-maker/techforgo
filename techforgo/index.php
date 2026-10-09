<?php
/**
 * The main template file
 *
 * @package TechForGo
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">
		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php if ( have_posts() ) : ?>
					<header class="tfg-page-header">
						<h1 class="tfg-archive-title"><?php esc_html_e( 'Latest Articles', 'techforgo' ); ?></h1>
					</header>

					<div class="tfg-posts-grid">
						<?php
						while ( have_posts() ) :
							the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						?>
					</div>

					<?php techforgo_pagination(); ?>

				<?php else : ?>
					<div class="tfg-no-posts">
						<h2><?php esc_html_e( 'No Articles Found', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'It seems there are no publications matching this request.', 'techforgo' ); ?></p>
					</div>
				<?php endif; ?>
			</div>

			<?php get_sidebar(); ?>
		</div>
	</div>
</main>

<?php
get_footer();
